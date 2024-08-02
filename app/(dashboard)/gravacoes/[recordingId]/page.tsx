import { Audio, getRecording } from 'app/entities/recordings'
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

type ViewRecordingProps = {
  params: {
    recordingId: string
  }
}

export default async function ViewRecording({
  params: { recordingId },
}: ViewRecordingProps) {
  const recording = await getRecording(recordingId)

  return (
    <Container>
      <Stack>
        <GenerateMergedAudioButton
          sx={{ alignSelf: 'flex-start' }}
          recording={recording}
        />
        <Typography variant="h4" component="h2">
          {recording.title.text}
        </Typography>
        <AudioPlayer audio={recording.title} />
        <Typography variant="h4" component="h2">
          Capítulos
        </Typography>
        {recording.chapters.map((chapter) => (
          <Card variant="outlined">
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
