import { createReadStream, ReadStream } from 'fs'
import {
  AudioConfig,
  SpeechConfig,
  SpeechSynthesisOutputFormat,
  SpeechSynthesizer,
} from 'microsoft-cognitiveservices-speech-sdk'
import pRetry from 'p-retry'
import { RETRY_OPTIONS } from './constants'

export const textToSpeech = async (
  fileId: string,
  text: string,
  voiceName: string,
) => {
  const speechConfig = SpeechConfig.fromSubscription(
    process.env.AZURE_TTS_API_KEY as string,
    process.env.AZURE_TTS_REGION as string,
  )
  speechConfig.speechSynthesisLanguage = 'pt-BR'
  speechConfig.speechSynthesisOutputFormat =
    SpeechSynthesisOutputFormat.Audio16Khz32KBitRateMonoMp3
  speechConfig.speechSynthesisVoiceName = voiceName

  const filename = `/tmp/${fileId}.mp3`
  const audioConfig = AudioConfig.fromAudioFileOutput(filename)
  const synthesizer = new SpeechSynthesizer(speechConfig, audioConfig)

  console.log(`generating tts ${fileId}`)

  const result = pRetry(
    () =>
      new Promise<ReadStream>((resolve, reject) => {
        synthesizer.speakTextAsync(
          text,
          () => {
            console.log(`tts finished ${fileId}`)
            synthesizer.close(
              () => {
                const audioFile = createReadStream(filename)
                resolve(audioFile)
              },
              (error) => {
                console.error(
                  `tts error when closing synthesizer ${fileId}`,
                  error,
                )
                reject(error)
              },
            )
          },
          (error) => {
            console.error(`tts error ${fileId}`, error)
            const runReject = () => () => reject(error)
            synthesizer.close(runReject, runReject)
          },
        )
      }),
    RETRY_OPTIONS,
  )

  return result
}
