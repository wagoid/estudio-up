import { getVoicesAction } from '@/lib/modules/tts/tts.actions'
import { UploadVoiceForm } from './_components/UploadVoiceForm'
import { Card, CardHeader, Container, Paper, Stack } from '@mui/material'
import { DeleteVoiceForm } from './_components/DeleteVoiceForm'

export default async function ManageVoices() {
  const voices = await getVoicesAction()

  return (
    <Stack spacing={4} component={Container}>
      <UploadVoiceForm />
      <DeleteVoiceForm voices={voices} />
    </Stack>
  )
}
