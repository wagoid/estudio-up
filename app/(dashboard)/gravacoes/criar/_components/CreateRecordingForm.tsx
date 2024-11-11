'use client'

import { FormSubmitButton } from '@/components/ui/FormSubmitButton'
import { FormTextField } from '@/components/ui/FormTextField'
import { requiredString } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Container, Stack, Typography } from '@mui/material'
import { createInitialRecordingAction } from '@/lib/modules/recordings/recordings.actions'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { defaultVoices } from '@/lib/modules/recordings/recordings.constants'
import { FC } from 'react'
import { FormSelect } from '@/components/ui/FormSelect'

const schema = z.object({
  title: requiredString(),
  voice: requiredString(),
})

type FormValues = z.infer<typeof schema>

export const CreateRecordingForm: FC<{ voices: string[] }> = ({ voices }) => {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      title: '',
      voice:
        voices.find((voice) => voice === defaultVoices.main.code) ?? voices[0],
    },
    resolver: zodResolver(schema),
    mode: 'onBlur',
  })
  const voiceOptions = voices.map((voice) => ({ label: voice, value: voice }))

  const onSubmit = handleSubmit(async (formData) => {
    await createInitialRecordingAction(formData.title, formData.voice)
  })

  return (
    <Container
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={onSubmit}
    >
      <Stack alignItems="flex-start">
        <Typography variant="h4" component="h2">
          Criar gravação
        </Typography>
        <Typography variant="subtitle1">
          Defina o título da gravação, para depois criar os capítulos.
        </Typography>
        <FormSelect
          idSuffix=""
          name="voice"
          label="Voz"
          options={voiceOptions}
          control={control}
        />
        <FormTextField name="title" label="Título" control={control} />
        <FormSubmitButton control={control}>Criar</FormSubmitButton>
      </Stack>
    </Container>
  )
}
