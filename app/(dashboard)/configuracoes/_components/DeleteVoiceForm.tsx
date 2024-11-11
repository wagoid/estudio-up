'use client'

import { FormSubmitButton } from '@/components/ui/FormSubmitButton'
import { requiredString } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Alert,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { FC } from 'react'
import { deleteVoiceAction } from '@/lib/modules/tts/tts.actions'
import { FormSelect } from '@/components/ui/FormSelect'
import { useRouter } from 'next/navigation'

const schema = z.object({
  voice: requiredString(),
})

type FormValues = z.infer<typeof schema>

export const DeleteVoiceForm: FC<{ voices: string[] }> = ({ voices }) => {
  const router = useRouter()
  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      voice: '',
    },
    resolver: zodResolver(schema),
    mode: 'onBlur',
  })

  const onSubmit = handleSubmit(async (values) => {
    await deleteVoiceAction(values.voice)
    reset()
    router.refresh()
  })

  const voiceOptions = voices.map((voice) => ({ label: voice, value: voice }))

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
          Excluir voz
        </Typography>
        <Alert severity="warning">
          O arquivo será removido permanentemente
        </Alert>
        <FormSelect
          idSuffix=""
          name="voice"
          label="Voz"
          options={voiceOptions}
          control={control}
          sx={{ minWidth: 100 }}
        />
        <FormSubmitButton color="error" control={control}>
          EXCLUIR
        </FormSubmitButton>
      </Stack>
    </Paper>
  )
}
