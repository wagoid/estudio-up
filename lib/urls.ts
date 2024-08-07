import { Audio } from '@/lib/modules/recordings/Recording.entity'

export const buildAudioPath = (audio: Pick<Audio, 'fileId'>) =>
  `/api/audios/${audio.fileId}.mp3`
