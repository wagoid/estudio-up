import { Audio } from '@/lib/modules/recordings/Recording.entity'
import { CSSProperties, FC } from 'react'

type AudioPlayerProps = {
  audio: Pick<Audio, 'fileId'>
  style?: CSSProperties
}

export const AudioPlayer: FC<AudioPlayerProps> = ({ audio, style }) => (
  <audio
    controls
    style={{ display: 'inline-block', ...style }}
    key={audio.fileId}
  >
    <source src={`/api/audios/${audio.fileId}.mp3`} type="audio/mpeg" />
  </audio>
)
