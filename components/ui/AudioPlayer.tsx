import { Audio } from 'app/entities/recordings'
import { CSSProperties, FC } from 'react'

type AudioPlayerProps = {
  audio: Omit<Audio, 'voice'>
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
