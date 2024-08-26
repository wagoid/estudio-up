import { Audio } from '@/lib/modules/recordings/Recording.entity'
import { buildAudioUrl } from '@/lib/urls'
import { CSSProperties, FC } from 'react'

type AudioPlayerProps = {
  audio: Pick<Audio, 'fileId'>
  style?: CSSProperties
  objectStoreUrl: string
}

export const AudioPlayer: FC<AudioPlayerProps> = ({
  audio,
  style,
  objectStoreUrl,
}) =>
  audio.fileId ? (
    <audio
      controls
      style={{ display: 'inline-block', ...style }}
      key={audio.fileId}
    >
      <source src={buildAudioUrl(audio, objectStoreUrl)} type="audio/mpeg" />
    </audio>
  ) : null
