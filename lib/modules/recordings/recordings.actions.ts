'use server'

import { PaginationParams, PaginationResponse } from '@/lib/db'
import { generateId } from '@/lib/id'
import { deleteFile, uploadFile } from '@/lib/objectStore'
import { textToSpeech } from '@/lib/tts'
import {
  buildAudioFilePath,
  createRecording,
  getRecording,
  deleteRecording,
  saveRecording,
  getRecordings,
  GetRecordingsParams,
  normalizeTextForTTS,
} from '@/lib/modules/recordings/recordings.utils'
import { redirect } from 'next/navigation'
import {
  Audio,
  Chapter,
  ChapterType,
  RecordingObj,
  Voice,
} from './Recording.entity'
import { audioUploadInput, azureVoices } from './recordings.constants'

export const createInitialRecordingAction = async (titleParam: string) => {
  const title = normalizeTextForTTS(titleParam)
  const fileId = generateId()
  const audioFile = await textToSpeech(fileId, title, azureVoices.main.code)

  await uploadFile(buildAudioFilePath(fileId), audioFile, audioUploadInput)
  const recording = await createRecording({
    title: {
      text: title,
      fileId,
      voice: azureVoices.main,
    },
    chapters: [],
  })

  return redirect(`/gravacoes/${recording.id}/editar`)
}

export type UpsertChapterData = {
  titleId?: string
  type: ChapterType
  titleText?: string
  contentId: string
  contentText: string
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

const buildTitleAudio = async (
  voice: Voice,
  inputTitleId?: string,
  titleId?: string,
  titleText?: string,
  existingChapter?: Chapter,
): Promise<Audio | undefined> => {
  const hasChanged = !existingChapter || inputTitleId !== titleId

  if (titleId && titleText && hasChanged) {
    const titleAudio = await textToSpeech(titleId, titleText, voice.code)
    await uploadFile(buildAudioFilePath(titleId), titleAudio, audioUploadInput)

    return {
      fileId: titleId,
      text: titleText,
      voice,
    }
  }

  return existingChapter?.title
}

const buildContentAudio = async (
  voice: Voice,
  inputContentId: string,
  contentId: string,
  contentText: string,
  existingChapter?: Chapter,
): Promise<Audio> => {
  let content: Audio

  if (inputContentId !== contentId || !existingChapter) {
    const titleAudio = await textToSpeech(contentId, contentText, voice.code)
    await uploadFile(
      buildAudioFilePath(contentId),
      titleAudio,
      audioUploadInput,
    )

    content = {
      fileId: contentId,
      text: contentText,
      voice,
    }
  } else {
    content = existingChapter.content
  }

  return content
}

export const upsertChapterAction = async (
  id: number,
  formData: UpsertChapterData,
) => {
  const {
    type,
    titleId: inputTitleId,
    titleText: titleTextParam,
    contentId: inputContentId,
    contentText: contentTextParam,
  } = formData
  const titleText = titleTextParam && normalizeTextForTTS(titleTextParam)
  const contentText = contentTextParam && normalizeTextForTTS(contentTextParam)

  const voice =
    type === 'content' ? azureVoices.main : azureVoices.imageDescription

  const recording = await getRecording(id)
  const currentChapterPredicate = (chapter: Chapter) =>
    chapter.content.fileId === inputContentId
  const existingChapter = recording.data.chapters.find(currentChapterPredicate)

  const titleId =
    inputTitleId && existingChapter?.title?.text !== titleText
      ? generateId()
      : inputTitleId
  const contentId =
    existingChapter?.content.text !== contentText
      ? generateId()
      : inputContentId

  const chapterToUpsert: Chapter = {
    type,
    content: await buildContentAudio(
      voice,
      inputContentId,
      contentId,
      contentText,
      existingChapter,
    ),
    title: await buildTitleAudio(
      voice,
      inputTitleId,
      titleId,
      titleText,
      existingChapter,
    ),
  }

  const updatedChapters = existingChapter
    ? recording.data.chapters.map((chapter) => {
        if (currentChapterPredicate(chapter)) {
          return chapterToUpsert
        }

        return chapter
      })
    : [...recording.data.chapters, chapterToUpsert]

  recording.data = {
    ...recording.data,
    chapters: updatedChapters,
  }

  await saveRecording(recording)

  if (existingChapter) {
    if (inputTitleId && inputTitleId !== titleId) {
      await deleteFile(buildAudioFilePath(inputTitleId))
    }
    if (inputContentId !== contentId) {
      await deleteFile(buildAudioFilePath(inputContentId))
    }
  }
}

export const deleteChapterAction = async (
  id: number,
  contentFileId: string,
  titleFileId?: string,
) => {
  const recording = await getRecording(id)

  if (titleFileId) {
    await deleteFile(buildAudioFilePath(titleFileId))
  }
  await deleteFile(buildAudioFilePath(contentFileId))

  recording.data.chapters = recording.data.chapters.filter(
    (chapter) => chapter.content.fileId !== contentFileId,
  )

  await saveRecording(recording)
}

export const updateRecordingTitleAction = async (
  id: number,
  titleId: string,
  titleTextParam: string,
) => {
  const titleText = normalizeTextForTTS(titleTextParam)
  const fileId = generateId()
  const audioFile = await textToSpeech(fileId, titleText, azureVoices.main.code)
  const recording = await getRecording(id)

  await uploadFile(buildAudioFilePath(fileId), audioFile, audioUploadInput)

  recording.data.title = {
    text: titleText,
    fileId,
    voice: azureVoices.main,
  }

  await saveRecording(recording)

  await deleteFile(buildAudioFilePath(titleId))
}

export const deleteRecordingAction = async (id: number) => {
  const {
    data: { title, chapters },
  } = await getRecording(id)

  await deleteRecording(id)

  await deleteFile(buildAudioFilePath(title.fileId))

  for (const chapter of chapters) {
    await deleteFile(buildAudioFilePath(chapter.content.fileId))

    if (chapter.title) {
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

  await uploadFile(
    buildAudioFilePath(fileId),
    (await file.arrayBuffer()) as Buffer,
    audioUploadInput,
  )

  recording.data.fileId = fileId

  await saveRecording(recording)
}
