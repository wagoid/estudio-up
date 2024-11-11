import { Voice } from '@/lib/modules/recordings/Recording.entity'

const mainVoice: Voice = {
  source: 'internal',
  code: 'Matilde',
}

const imageDescriptionVoice: Voice = {
  source: 'internal',
  code: 'Diego',
}

export const defaultVoices = {
  main: mainVoice,
  imageDescription: imageDescriptionVoice,
}

export const audiosFolder = 'audios'

export const audioUploadInput = {
  ContentType: 'audio/mpeg',
}
