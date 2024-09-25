import { Audio } from '@/lib/modules/recordings/Recording.entity'

export const buildAudioUrl = (
  audio: Pick<Audio, 'fileId'>,
  objectStoreUrl: string,
) => `${objectStoreUrl}/up-estudio/audios/${audio.fileId}.mp3`
