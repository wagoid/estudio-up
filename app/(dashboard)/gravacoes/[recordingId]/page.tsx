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
import { getRecordingAction } from '@/lib/modules/recordings/recordings.actions'
import { RecordingFileInfo } from '../_components/RecordingFileInfo'
import { unstable_noStore as noStore } from 'next/cache'

type ViewRecordingProps = {
  params: {
    recordingId: string
  }
}

export default async function ViewRecording({
  params: { recordingId },
}: ViewRecordingProps) {
  noStore()
  const objectStoreUrl = process.env.AWS_S3_PUBLIC_URL as string
  const recording = await getRecordingAction(recordingId)

  return (
    <Container>
      <Stack>
        <RecordingFileInfo
          recording={recording}
          objectStoreUrl={objectStoreUrl}
        />
        <Typography variant="h4" component="h2">
          {recording.data.title.text}
        </Typography>
        <AudioPlayer
          audio={recording.data.title}
          objectStoreUrl={objectStoreUrl}
        />
        <Typography variant="h4" component="h2">
          Capítulos
        </Typography>
        {recording.data.chapters.map((chapter) => (
          <Card variant="outlined" key={chapter.id}>
            {chapter.title && (
              <CardHeader
                variant="body2"
                title={chapter.title.text}
                subheader={
                  <AudioPlayer
                    audio={chapter.title}
                    objectStoreUrl={objectStoreUrl}
                  />
                }
              />
            )}
            <CardContent component={Stack}>
              <Typography variant="body2">{chapter.content.text}</Typography>
              <AudioPlayer
                audio={chapter.content}
                objectStoreUrl={objectStoreUrl}
              />
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Container>
  )
}
