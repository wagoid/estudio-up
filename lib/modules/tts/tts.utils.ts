import { createReadStream, createWriteStream } from 'fs'
import pRetry from 'p-retry'
import { RETRY_OPTIONS } from '../../constants'
import { normalizeTextForTTS } from '../recordings/recordings.utils'
import { finished } from 'stream/promises'
import { Readable } from 'node:stream'
import { ReadableStream } from 'stream/web'
import { execa } from 'execa'
import { tmpdir } from 'os'
import { resolve } from 'path'

const buildTextToSpeechUrl = (
  pathname: string,
  searchParams: Record<string, string> = {},
) => {
  const url = new URL(`${process.env.TTS_URL as string}${pathname}`)
  if (process.env.TTS_USERNAME && process.env.TTS_PASSWORD) {
    url.username = process.env.TTS_USERNAME
    url.password = process.env.TTS_PASSWORD
  }

  Object.entries(searchParams).forEach(([param, value]) => {
    url.searchParams.set(param, value)
  })

  return url
}

const maxChunkLength = 140
const fullStopFixCharacters = '|'
const sentenceEndRegex = /(\.|!|\?)(?:\n| |$)/
const sentencePartRegex = /(,)(?: )/

const splitBySentenceParts = (text: string) => {
  const chunks: string[] = []
  const splittedText = text.split(sentencePartRegex)

  let nextChunks: string[] = []
  splittedText.forEach((chunk, index) => {
    if (chunk === ',') {
      nextChunks.push(chunk)
    } else if (nextChunks.join('').length + chunk.length <= maxChunkLength) {
      nextChunks.push(chunk)
    } else {
      chunks.push(...(nextChunks.length ? [nextChunks.join('')] : []))
      nextChunks = []
      nextChunks.push(chunk)
    }

    if (index === splittedText.length - 1 && nextChunks.length) {
      chunks.push(nextChunks.join(''))
      nextChunks = []
    }
  })

  return chunks
}

const splitTextIntoChunks = (text: string) => {
  const chunks: string[] = []
  const splittedBySentenceEnd = text.split(sentenceEndRegex)

  let nextChunks: string[] = []
  splittedBySentenceEnd.forEach((chunk, index) => {
    if (chunk === '.') {
      // https://github.com/coqui-ai/TTS/issues/2952#issuecomment-2270177157
      if (chunks.length === 0 && nextChunks.length) {
        nextChunks.push(fullStopFixCharacters)
      } else if (chunks.length > 0) {
        chunks[chunks.length - 1] += fullStopFixCharacters
      }
    } else if (chunk.length + nextChunks.join('').length <= maxChunkLength) {
      nextChunks.push(chunk)
    } else if (chunk.length >= maxChunkLength) {
      chunks.push(...(nextChunks.length ? [nextChunks.join('')] : []))
      chunks.push(...splitBySentenceParts(chunk))
      nextChunks = []
    } else {
      chunks.push(...(nextChunks.length ? [nextChunks.join('')] : []))
      nextChunks = []
      nextChunks.push(chunk)
    }

    if (index === splittedBySentenceEnd.length - 1 && nextChunks.length) {
      chunks.push(nextChunks.join(''))
      nextChunks = []
    }
  })

  const filteredChunks = chunks
    .map((chunk) => chunk.replaceAll('\n', ''))
    .filter((chunk) => !!chunk)

  // Adiciona um ponto final a textos que são somente uma frase e não têm um (como títulos de capítulos)
  if (
    filteredChunks.length === 1 &&
    !filteredChunks[0].endsWith(fullStopFixCharacters)
  ) {
    filteredChunks[0] += fullStopFixCharacters
  }

  return filteredChunks
}

export const textToSpeech = async (
  fileId: string,
  textParam: string,
  voiceName: string,
) => {
  console.log(`generating tts: ${textParam}`)

  const text = normalizeTextForTTS(textParam)
  const chunks = splitTextIntoChunks(text)

  const mp3Files: string[] = []

  for (const [index, text] of chunks.entries()) {
    const filename = resolve(tmpdir(), `${fileId}-${index}.wav`)
    const mp3Filename = filename.replace('.wav', '.mp3')

    await pRetry(async () => {
      const url = buildTextToSpeechUrl('/api/tts-generate-streaming', {
        language: 'pt',
        output_file: filename,
        voice: `${voiceName}.wav`,
        text,
      })

      // remove o arquivo se ele já existe devido a tentativas anteriores
      await execa`rm -f ${filename}`

      const fileStream = createWriteStream(filename)
      const res = await fetch(url)
      await finished(
        Readable.fromWeb(res.body as ReadableStream).pipe(fileStream),
      )
    }, RETRY_OPTIONS)

    await pRetry(
      () => execa`ffmpeg -i ${filename} -b:a 64k ${mp3Filename}`,
      RETRY_OPTIONS,
    )

    await execa`rm -f ${filename}`

    mp3Files.push(mp3Filename)
  }

  if (mp3Files.length > 1) {
    const outputFilename = resolve(tmpdir(), `${fileId}.mp3`)
    const mp3wrapGeneratedFilename = outputFilename.replace(
      fileId,
      `${fileId}_MP3WRAP`,
    )

    await execa`mp3wrap ${outputFilename} ${mp3Files}`

    await Promise.all(
      mp3Files.map((fileToDelete) => execa`rm -f ${fileToDelete}`),
    )

    return mp3wrapGeneratedFilename
  }

  return mp3Files[0]
}

export const getVoices = async () => {
  const url = buildTextToSpeechUrl('/api/voices')
  const res = await pRetry(() => fetch(url))
  const body = (await res.json()) as { voices: string[] }

  return body.voices.map((voice) => voice.replace('.wav', '')).sort()
}
