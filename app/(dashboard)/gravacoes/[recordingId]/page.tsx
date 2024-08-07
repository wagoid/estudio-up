import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Stack,
  Typography,
} from '@mui/material'
import { AudioPlayer } from '@/components/ui/AudioPlayer'
import { GenerateMergedAudioButton } from '../_components/GenerateMergedAudioButton'
import { getRecordingAction } from '@/lib/modules/recordings/recordings.actions'

type ViewRecordingProps = {
  params: {
    recordingId: string
  }
}

export default async function ViewRecording({
  params: { recordingId },
}: ViewRecordingProps) {
  const recording = await getRecordingAction(recordingId)

  return (
    <Container>
      <Stack>
        <GenerateMergedAudioButton
          sx={{ alignSelf: 'flex-start' }}
          recording={recording}
        />
        <Typography variant="h4" component="h2">
          {recording.data.title.text}
        </Typography>
        <AudioPlayer audio={recording.data.title} />
        <Typography variant="h4" component="h2">
          Capítulos
        </Typography>
        {recording.data.chapters.map((chapter) => (
          <Card variant="outlined" key={chapter.content.fileId}>
            {chapter.title && (
              <CardHeader
                variant="body2"
                title={chapter.title.text}
                subheader={<AudioPlayer audio={chapter.title} />}
              />
            )}
            <CardContent component={Stack}>
              <Typography variant="body2">{chapter.content.text}</Typography>
              <AudioPlayer audio={chapter.content} />
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Container>
  )
}
