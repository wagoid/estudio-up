'use server'

import { azureVoices, audioUploadInput } from '@/lib/constants'
import { generateId } from '@/lib/id'
import { deleteFile, uploadFile } from '@/lib/objectStore'
import { textToSpeech } from '@/lib/tts'
import {
  Audio,
  buildAudioFilePath,
  Chapter,
  ChapterType,
  createRecording,
  getRecording,
  updateRecording,
  Voice,
  deleteRecording as deleteDBRecording,
} from 'app/entities/recordings'
import { redirect } from 'next/navigation'

export const createInitialRecording = async (title: string) => {
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

  return redirect(`/gravacoes/${recording._id}/editar`)
}

export type UpsertChapterData = {
  titleId?: string
  type: ChapterType
  titleText?: string
  contentId: string
  contentText: string
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

export const upsertChapter = async (
  id: string,
  formData: UpsertChapterData,
) => {
  const {
    type,
    titleId: inputTitleId,
    titleText,
    contentId: inputContentId,
    contentText,
  } = formData

  const voice =
    type === 'content' ? azureVoices.main : azureVoices.imageDescription

  const recording = await getRecording(id)
  const currentChapterPredicate = (chapter: Chapter) =>
    chapter.content.fileId === inputContentId
  const existingChapter = recording.chapters.find(currentChapterPredicate)

  const titleId =
    inputTitleId && existingChapter?.title?.text !== titleText
      ? generateId()
      : inputTitleId
  const contentId =
    existingChapter?.content.text !== contentText
      ? generateId()
      : inputContentId

  const chapterToUpsert: Chapter = {
    type: 'content',
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
    ? recording.chapters.map((chapter) => {
        if (currentChapterPredicate(chapter)) {
          return chapterToUpsert
        }

        return chapter
      })
    : [...recording.chapters, chapterToUpsert]

  await updateRecording(id, {
    $set: {
      chapters: updatedChapters,
    },
  })

  if (existingChapter) {
    if (inputTitleId && inputTitleId !== titleId) {
      await deleteFile(buildAudioFilePath(inputTitleId))
    }
    if (inputContentId !== contentId) {
      await deleteFile(buildAudioFilePath(inputContentId))
    }
  }
}

export const deleteChapter = async (
  id: string,
  contentFileId: string,
  titleFileId?: string,
) => {
  const recording = await getRecording(id)

  if (titleFileId) {
    await deleteFile(buildAudioFilePath(titleFileId))
  }
  await deleteFile(buildAudioFilePath(contentFileId))

  await updateRecording(id, {
    $pull: {
      chapters: recording.chapters.find(
        (chapter) => chapter.content.fileId === contentFileId,
      ),
    },
  })
}

export const updateRecordingTitle = async (
  id: string,
  titleId: string,
  titleText: string,
) => {
  const fileId = generateId()
  const audioFile = await textToSpeech(fileId, titleText, azureVoices.main.code)

  await uploadFile(buildAudioFilePath(fileId), audioFile, audioUploadInput)
  await updateRecording(id, {
    $set: {
      title: {
        text: titleText,
        fileId,
        voice: azureVoices.main,
      },
    },
  })
  await deleteFile(buildAudioFilePath(titleId))
}

export const deleteRecording = async (id: string) => {
  const { title, chapters } = await getRecording(id)

  await deleteDBRecording(id)

  await deleteFile(buildAudioFilePath(title.fileId))

  for (const chapter of chapters) {
    await deleteFile(buildAudioFilePath(chapter.content.fileId))

    if (chapter.title) {
      await deleteFile(buildAudioFilePath(chapter.title.fileId))
    }
  }
}
