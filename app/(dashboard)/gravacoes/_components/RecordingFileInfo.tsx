'use client'

import { AudioPlayer } from '@/components/ui/AudioPlayer'
import { RecordingObj } from '@/lib/modules/recordings/Recording.entity'
import { buildAudioUrl } from '@/lib/urls'
import { Link, Stack, Typography } from '@mui/material'
import { FC, useEffect, useState } from 'react'

export const RecordingFileInfo: FC<{
  recording: RecordingObj
  objectStoreUrl: string
  inline?: boolean
}> = ({
  inline,
  objectStoreUrl,
  recording: {
    data: { fileId },
  },
}) => {
  const [isClient, setIsClient] = useState(false)

  const finalAudioUrl =
    isClient && fileId && buildAudioUrl({ fileId }, objectStoreUrl)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!finalAudioUrl) return null

  if (inline) {
    return (
      <Stack direction="row" alignItems="center">
        <AudioPlayer audio={{ fileId }} objectStoreUrl={objectStoreUrl} />
        <Link
          target="_blank"
          prefetch={false}
          underline="always"
          href={finalAudioUrl}
        >
          Link
        </Link>
      </Stack>
    )
  }

  return (
    <>
      <Stack direction="row" alignItems="center">
        <Typography>Áudio final:</Typography>
        <AudioPlayer audio={{ fileId }} objectStoreUrl={objectStoreUrl} />
      </Stack>
      <span>
        Link do áudio final:{' '}
        <Link target="_blank" prefetch={false} href={finalAudioUrl}>
          {finalAudioUrl}
        </Link>
      </span>
    </>
  )
}
