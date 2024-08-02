'use client'

import { FormSubmitButton } from '@/components/ui/FormSubmitButton'
import { FormTextField } from '@/components/ui/FormTextField'
import { requiredString } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Container, Stack, Typography } from '@mui/material'
import { createInitialRecording } from 'app/actions/recordings'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
  title: requiredString(),
})

type FormValues = z.infer<typeof schema>

export default function CreateRecording() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      title: '',
    },
    resolver: zodResolver(schema),
    mode: 'onBlur',
  })

  const onSubmit = handleSubmit(async (formData) => {
    await createInitialRecording(formData.title)
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
        <FormTextField name="title" label="Título" control={control} />
        <FormSubmitButton control={control}>Criar</FormSubmitButton>
      </Stack>
    </Container>
  )
}
