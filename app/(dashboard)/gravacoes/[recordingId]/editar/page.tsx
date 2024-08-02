import { getRecording } from 'app/entities/recordings'
import { PageContent } from '../_components/PageContent'
import { Container } from '@mui/material'

export const dynamic = 'force-dynamic'

type EditRecordingProps = {
  params: {
    recordingId: string
  }
}

export default async function EditRecording({
  params: { recordingId },
}: EditRecordingProps) {
  const recording = await getRecording(recordingId)

  return (
    <Container>
      <PageContent recording={recording} />
    </Container>
  )
}
