'use client'

import { Button, ButtonProps } from '@mui/material'
import { RecordingObj } from '@/lib/modules/recordings/Recording.entity'
import { FC } from 'react'
import { generateMergedAudioAction } from '@/lib/modules/recordings/recordings.actions'
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
    await generateMergedAudioAction(id)
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
