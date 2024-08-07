'use client'

import { FormSubmitButton } from '@/components/ui/FormSubmitButton'
import { FormTextField } from '@/components/ui/FormTextField'
import { Box, Button, Stack } from '@mui/material'
import { updateRecordingTitleAction } from '@/lib/modules/recordings/recordings.actions'
import { Recording } from '@/lib/modules/recordings/Recording.entity'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { requiredString } from '@/lib/validation'
import { z } from 'zod'
import { AudioPlayer } from '@/components/ui/AudioPlayer'
import { useRouter } from 'next/navigation'
import { RecordingObj } from '@/lib/modules/recordings/Recording.entity'

const schema = z.object({
  title: requiredString(),
})

type FormValues = z.infer<typeof schema>

type EditTitleFormProps = {
  recording: RecordingObj
}

export const EditTitleForm: FC<EditTitleFormProps> = ({
  recording: {
    id,
    data: { title },
  },
}) => {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      title: title.text,
    },
    resolver: zodResolver(schema),
    mode: 'onBlur',
  })
  const router = useRouter()

  const onSubmit = handleSubmit(async (formData) => {
    await updateRecordingTitleAction(id, title.fileId, formData.title)
    router.refresh()
  })

  return (
    <Box component="form" noValidate autoComplete="off" onSubmit={onSubmit}>
      <Stack alignItems="flex-start">
        <FormTextField name="title" label="Título" control={control} required />
        <AudioPlayer audio={title} />
        <FormSubmitButton control={control}>Gerar áudio</FormSubmitButton>
      </Stack>
    </Box>
  )
}
