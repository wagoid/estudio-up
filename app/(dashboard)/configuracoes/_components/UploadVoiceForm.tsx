'use client'

import { FormSubmitButton } from '@/components/ui/FormSubmitButton'
import { FormTextField } from '@/components/ui/FormTextField'
import { requiredString } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Paper, Stack, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { FC } from 'react'
import { uploadVoiceAction } from '@/lib/modules/tts/tts.actions'
import { useRouter } from 'next/navigation'

const schema = z.object({
  voice: requiredString(),
})

type FormValues = z.infer<typeof schema>

export const UploadVoiceForm: FC = () => {
  const router = useRouter()
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      voice: '',
    },
    resolver: zodResolver(schema),
    mode: 'onBlur',
  })

  const onSubmit = handleSubmit(async (values) => {
    const input = document.getElementById(
      'upload-voice-input',
    ) as HTMLInputElement

    if (input.files?.[0]) {
      const formData = new FormData()
      formData.append('file', input.files[0])
      await uploadVoiceAction(formData)
      router.refresh()
    }
  })

  return (
    <Paper
      sx={{ p: 2 }}
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={onSubmit}
    >
      <Stack spacing={2} alignItems="flex-start">
        <Typography variant="h5" component="h3">
          Adicionar voz à lista de vozes disponíveis
        </Typography>
        <FormTextField
          id="upload-voice-input"
          name="voice"
          type="file"
          inputProps={{
            accept: 'audio/wav',
          }}
          control={control}
        />
        <FormSubmitButton control={control}>Adicionar</FormSubmitButton>
      </Stack>
    </Paper>
  )
}
