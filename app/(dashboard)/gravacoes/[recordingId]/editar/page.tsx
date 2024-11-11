import { PageContent } from '../_components/PageContent'
import { Container } from '@mui/material'
import { getRecordingAction } from '@/lib/modules/recordings/recordings.actions'
import { unstable_noStore as noStore } from 'next/cache'
import { getVoicesAction } from '@/lib/modules/tts/tts.actions'

export const dynamic = 'force-dynamic'

type EditRecordingProps = {
  params: {
    recordingId: string
  }
}

export default async function EditRecording({
  params: { recordingId },
}: EditRecordingProps) {
  noStore()
  const recording = await getRecordingAction(recordingId)
  const voices = await getVoicesAction()

  return (
    <Container>
      <PageContent
        recording={recording}
        objectStoreUrl={process.env.AWS_S3_PUBLIC_URL as string}
        voices={voices}
      />
    </Container>
  )
}
