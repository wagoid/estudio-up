import { Audio } from '@/lib/modules/recordings/Recording.entity'

export const buildAudioUrl = (
  audio: Pick<Audio, 'fileId'>,
  objectStoreUrl: string,
) => `${objectStoreUrl}/estudio/audios/${audio.fileId}.mp3`
