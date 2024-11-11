'use client'

import { FormSubmitButton } from '@/components/ui/FormSubmitButton'
import { FormTextField } from '@/components/ui/FormTextField'
import { Box, Stack } from '@mui/material'
import { updateRecordingTitleAction } from '@/lib/modules/recordings/recordings.actions'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { requiredString } from '@/lib/validation'
import { z } from 'zod'
import { AudioPlayer } from '@/components/ui/AudioPlayer'
import { useRouter } from 'next/navigation'
import { RecordingObj } from '@/lib/modules/recordings/Recording.entity'
import { FormSelect } from '@/components/ui/FormSelect'
import { defaultVoices } from '@/lib/modules/recordings/recordings.constants'

const schema = z.object({
  title: requiredString(),
  voice: requiredString(),
})

type FormValues = z.infer<typeof schema>

type EditTitleFormProps = {
  recording: RecordingObj
  objectStoreUrl: string
  voices: string[]
}

export const EditTitleForm: FC<EditTitleFormProps> = ({
  recording: {
    id,
    data: { title },
  },
  objectStoreUrl,
  voices,
}) => {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      title: title.text,
      voice:
        voices.find((voice) => voice === defaultVoices.main.code) ?? voices[0],
    },
    resolver: zodResolver(schema),
    mode: 'onBlur',
  })
  const router = useRouter()
  const voiceOptions = voices.map((voice) => ({ label: voice, value: voice }))

  const onSubmit = handleSubmit(async (formData) => {
    await updateRecordingTitleAction(id, formData.title, formData.voice)
    router.refresh()
  })

  return (
    <Box component="form" noValidate autoComplete="off" onSubmit={onSubmit}>
      <Stack alignItems="flex-start">
        <FormSelect
          idSuffix={title.fileId ?? title.text}
          name="voice"
          label="Voz"
          options={voiceOptions}
          control={control}
        />
        <FormTextField name="title" label="Título" control={control} required />
        <AudioPlayer audio={title} objectStoreUrl={objectStoreUrl} />
        <FormSubmitButton control={control} disableDirtyCheck>
          Gerar áudio
        </FormSubmitButton>
      </Stack>
    </Box>
  )
}
