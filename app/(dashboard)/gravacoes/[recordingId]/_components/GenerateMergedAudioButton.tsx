'use client'

import { buildAudioUrl } from '@/lib/urls'
import { Button, ButtonProps } from '@mui/material'
import { RecordingObj } from '@/lib/modules/recordings/Recording.entity'
import Crunker from 'crunker'
import { FC } from 'react'
import { uploadMergedAudioAction } from '@/lib/modules/recordings/recordings.actions'
import { useRouter } from 'next/navigation'

export const GenerateMergedAudioButton: FC<
  Omit<ButtonProps, 'onClick'> & {
    recording: RecordingObj
    objectStoreUrl: string
  }
> = ({
  recording: {
    id,
    data: { title, chapters },
  },
  objectStoreUrl,
  ...otherProps
}) => {
  const router = useRouter()

  const generateMergedAudio = async () => {
    const crunker = new Crunker()
    const titleUrl = buildAudioUrl(title, objectStoreUrl)
    const chapterPaths = chapters
      .flatMap((chapter) =>
        chapter.title ? [chapter.title, chapter.content] : chapter.content,
      )
      .map((chapter) => buildAudioUrl(chapter, objectStoreUrl))

    const fetchedAudios = await crunker.fetchAudio(titleUrl, ...chapterPaths)
    const output = crunker.export(
      crunker.concatAudio(fetchedAudios),
      'audio/mp3',
    )

    const formData = new FormData()
    formData.append('file', output.blob)

    await uploadMergedAudioAction(id, formData)
    router.refresh()
  }

  return (
    <Button
      type="button"
      variant="contained"
      onClick={generateMergedAudio}
      {...otherProps}
    >
      Gerar áudio final
    </Button>
  )
}
