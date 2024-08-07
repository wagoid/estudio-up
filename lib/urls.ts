import { Audio } from '@/lib/modules/recordings/Recording.entity'

export const buildAudioPath = (audio: Audio) =>
  `/api/audios/${audio.fileId}.mp3`
