'use client'

import { FormSubmitButton } from '@/components/ui/FormSubmitButton'
import { FormTextField } from '@/components/ui/FormTextField'
import { Box, Button, Stack } from '@mui/material'
import { updateRecordingTitle } from 'app/actions/recordings'
import { Recording } from 'app/entities/recordings'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { requiredString } from '@/lib/validation'
import { z } from 'zod'
import { AudioPlayer } from '@/components/ui/AudioPlayer'
import { useRouter } from 'next/navigation'

const schema = z.object({
  title: requiredString(),
})

type FormValues = z.infer<typeof schema>

type EditTitleFormProps = {
  recording: Recording
}

export const EditTitleForm: FC<EditTitleFormProps> = ({ recording }) => {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      title: recording.title.text,
    },
    resolver: zodResolver(schema),
    mode: 'onBlur',
  })
  const router = useRouter()

  const onSubmit = handleSubmit(async (formData) => {
    await updateRecordingTitle(
      recording._id,
      recording.title.fileId,
      formData.title,
    )
    router.refresh()
  })

  return (
    <Box component="form" noValidate autoComplete="off" onSubmit={onSubmit}>
      <Stack alignItems="flex-start">
        <FormTextField name="title" label="Título" control={control} required />
        <AudioPlayer audio={recording.title} />
        <FormSubmitButton control={control}>Gerar áudio</FormSubmitButton>
      </Stack>
    </Box>
  )
}
