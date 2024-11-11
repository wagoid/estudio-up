'use server'

import { PaginationParams, PaginationResponse } from '@/lib/db'
import { generateId } from '@/lib/id'
import { deleteFile, downloadFile, uploadFile } from '@/lib/objectStore'
import { textToSpeech } from '@/lib/modules/tts/tts.utils'
import {
  buildAudioFilePath,
  createRecording,
  getRecording,
  deleteRecording,
  saveRecording,
  getRecordings,
  GetRecordingsParams,
  buildAudioFilename,
} from '@/lib/modules/recordings/recordings.utils'
import { redirect } from 'next/navigation'
import { execa } from 'execa'
import { clone } from 'rambda'
import {
  Chapter,
  ChapterType,
  RecordingData,
  RecordingObj,
  Voice,
} from './Recording.entity'
import { audioUploadInput, defaultVoices } from './recordings.constants'
import { resolve } from 'path'
import { tmpdir } from 'os'
import { createReadStream } from 'fs'

export const createInitialRecordingAction = async (
  title: string,
  voiceCode: string,
) => {
  const fileId = generateId()
  const audioFile = await textToSpeech(fileId, title, voiceCode)

  await uploadFile(buildAudioFilePath(fileId), audioFile, audioUploadInput)
  const recording = await createRecording({
    title: {
      text: title,
      fileId,
      voice: defaultVoices.main,
    },
    chapters: [],
  })

  return redirect(`/gravacoes/${recording.id}/editar`)
}

export const getRecordingAction = async (
  id: string | number,
): Promise<RecordingObj> => {
  const recording = await getRecording(id)

  return {
    ...recording,
  }
}

export const getRecordingsAction = async (
  pagination: PaginationParams,
  params: GetRecordingsParams,
): Promise<{ recordings: RecordingObj[]; pagination: PaginationResponse }> => {
  const result = await getRecordings(pagination, params)

  return {
    ...result,
    recordings: result.recordings.map((recording) => ({ ...recording })),
  }
}

export type CreateChapterData = {
  type: ChapterType
  titleText?: string
  contentText: string
  voiceCode: string
}

export const createChapterAction = async (
  recordingId: number,
  formData: CreateChapterData,
) => {
  const { type, titleText, contentText } = formData
  const voice: Voice = {
    source: 'internal',
    code: formData.voiceCode,
  }

  const recording = await getRecording(recordingId)

  const contentId = generateId()
  const contentAudio = await textToSpeech(contentId, contentText, voice.code)
  await uploadFile(
    buildAudioFilePath(contentId),
    contentAudio,
    audioUploadInput,
  )

  const chapterToInsert: Chapter = {
    id: generateId(),
    type,
    content: {
      fileId: contentId,
      text: contentText,
      voice,
    },
  }

  if (titleText) {
    const titleId = generateId()
    const contentAudio = await textToSpeech(titleId, titleText, voice.code)
    await uploadFile(
      buildAudioFilePath(titleId),
      contentAudio,
      audioUploadInput,
    )

    chapterToInsert.title = {
      fileId: titleId,
      text: titleText,
      voice,
    }
  }

  recording.data = {
    ...recording.data,
    chapters: [...recording.data.chapters, chapterToInsert],
  }

  await saveRecording(recording)
}

export type GenerateChapterAudioData = {
  type: ChapterType
  id: string
  titleText?: string
  contentText: string
  voiceCode: string
}

export const generateChapterAudioAction = async (
  recordingId: number,
  { type, id, titleText, contentText, voiceCode }: GenerateChapterAudioData,
) => {
  console.log(`generating chapter audio ${id} for recording ${recordingId}`)

  const recording = await getRecording(recordingId)
  const voice: Voice = {
    source: 'internal',
    code: voiceCode,
  }
  const existingChapter = recording.data.chapters.find(
    (chapter) => chapter.id === id,
  )

  if (!existingChapter) {
    throw new Error(`Chapter was not found: ${id}`)
  }

  const contentId = generateId()
  const contentAudio = await textToSpeech(contentId, contentText, voice.code)
  await uploadFile(
    buildAudioFilePath(contentId),
    contentAudio,
    audioUploadInput,
  )

  const chapterToUpdate: Chapter = {
    id: existingChapter.id,
    type,
    content: {
      fileId: contentId,
      text: contentText,
      voice,
    },
  }

  if (titleText) {
    const titleId = generateId()
    const contentAudio = await textToSpeech(titleId, titleText, voice.code)
    await uploadFile(
      buildAudioFilePath(titleId),
      contentAudio,
      audioUploadInput,
    )

    chapterToUpdate.title = {
      fileId: titleId,
      text: titleText,
      voice,
    }
  }

  const updatedChapters = recording.data.chapters.map((chapter) => {
    if (chapter.id === existingChapter.id) {
      return chapterToUpdate
    }

    return chapter
  })

  recording.data = {
    ...recording.data,
    chapters: updatedChapters,
  }

  await saveRecording(recording)

  if (existingChapter.title?.fileId) {
    await deleteFile(buildAudioFilePath(existingChapter.title.fileId))
  }
  if (existingChapter.content.fileId) {
    await deleteFile(buildAudioFilePath(existingChapter.content.fileId))
  }
}

export const deleteChapterAction = async (recordingId: number, id: string) => {
  console.log(`deleting chapter ${id} of recording ${recordingId}`)

  const recording = await getRecording(recordingId)
  const chapter = recording.data.chapters.find((chapter) => chapter.id === id)

  if (!chapter) {
    throw new Error(`Chapter was not found: ${id}`)
  }

  if (chapter.title?.fileId) {
    await deleteFile(buildAudioFilePath(chapter.title.fileId))
  }
  if (chapter.content.fileId) {
    await deleteFile(buildAudioFilePath(chapter.content.fileId))
  }

  recording.data.chapters = recording.data.chapters.filter(
    (chapter) => chapter.id !== id,
  )

  await saveRecording(recording)
}

export const updateRecordingTitleAction = async (
  id: number,
  titleText: string,
  voice: string,
) => {
  const fileId = generateId()
  const audioFile = await textToSpeech(fileId, titleText, voice)
  const recording = await getRecording(id)
  const currentTitleFileId = recording.data.title.fileId

  await uploadFile(buildAudioFilePath(fileId), audioFile, audioUploadInput)

  recording.data.title = {
    text: titleText,
    fileId,
    voice: {
      source: 'internal',
      code: voice,
    },
  }

  await saveRecording(recording)

  if (currentTitleFileId) {
    await deleteFile(buildAudioFilePath(currentTitleFileId))
  }
}

export const deleteRecordingAction = async (id: number) => {
  const {
    data: { title, chapters },
  } = await getRecording(id)

  await deleteRecording(id)

  if (title.fileId) {
    await deleteFile(buildAudioFilePath(title.fileId))
  }

  for (const chapter of chapters) {
    if (chapter.content.fileId) {
      await deleteFile(buildAudioFilePath(chapter.content.fileId))
    }

    if (chapter.title?.fileId) {
      await deleteFile(buildAudioFilePath(chapter.title.fileId))
    }
  }
}

export const uploadMergedAudioAction = async (
  id: number,
  formData: FormData,
) => {
  const file = formData.get('file') as File
  const fileId = generateId()

  const recording = await getRecording(id)
  const previousFileId = recording.data.fileId

  await uploadFile(
    buildAudioFilePath(fileId),
    (await file.arrayBuffer()) as Buffer,
    audioUploadInput,
  )

  if (previousFileId) {
    await deleteFile(buildAudioFilePath(previousFileId))
  }

  recording.data.fileId = fileId

  await saveRecording(recording)
}

export const generateMergedAudioAction = async (recordingId: number) => {
  const fileId = generateId()
  const filePath = resolve(tmpdir(), buildAudioFilename(fileId))
  const mp3wrapGeneratedFilePath = filePath.replace(fileId, `${fileId}_MP3WRAP`)

  console.log(`generating merged audio: ${recordingId}`)

  const recording = await getRecording(recordingId)
  const previousFileId = recording.data.fileId

  const titleAudios = recording.data.title.fileId
    ? [downloadFile(buildAudioFilePath(recording.data.title.fileId))]
    : []

  const chapterAudios = await Promise.all(
    titleAudios.concat(
      recording.data.chapters.flatMap((chapter) =>
        (chapter.title?.fileId
          ? [downloadFile(buildAudioFilePath(chapter.title.fileId))]
          : []
        ).concat(
          chapter.content.fileId
            ? [downloadFile(buildAudioFilePath(chapter.content.fileId))]
            : [],
        ),
      ),
    ),
  )

  await execa`mp3wrap ${filePath} ${chapterAudios}`

  await uploadFile(
    buildAudioFilePath(fileId),
    createReadStream(mp3wrapGeneratedFilePath),
    audioUploadInput,
  )

  if (previousFileId) {
    await deleteFile(buildAudioFilePath(previousFileId))
  }

  const updatedData: RecordingData = clone(recording.data)

  updatedData.fileId = fileId

  if (updatedData.title.fileId) {
    await deleteFile(buildAudioFilePath(updatedData.title.fileId))
    delete updatedData.title.fileId
  }

  for (const chapter of updatedData.chapters) {
    if (chapter.title?.fileId) {
      await deleteFile(buildAudioFilePath(chapter.title.fileId))
      delete chapter.title.fileId
    }

    if (chapter.content.fileId) {
      await deleteFile(buildAudioFilePath(chapter.content.fileId))
      delete chapter.content.fileId
    }
  }

  recording.data = updatedData

  await saveRecording(recording)
}
