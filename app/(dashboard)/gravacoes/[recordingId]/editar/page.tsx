import { PageContent } from '../_components/PageContent'
import { Container } from '@mui/material'
import { getRecordingAction } from '@/lib/modules/recordings/recordings.actions'

export const dynamic = 'force-dynamic'

type EditRecordingProps = {
  params: {
    recordingId: string
  }
}

export default async function EditRecording({
  params: { recordingId },
}: EditRecordingProps) {
  const recording = await getRecordingAction(recordingId)

  return (
    <Container>
      <PageContent recording={recording} />
    </Container>
  )
}
