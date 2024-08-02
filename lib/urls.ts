import { Audio } from 'app/entities/recordings'

export const buildAudioPath = (audio: Audio) =>
  `/api/audios/${audio.fileId}.mp3`
