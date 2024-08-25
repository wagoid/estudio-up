import { Voice } from '@/lib/modules/recordings/Recording.entity'

const mainVoice: Voice = {
  source: 'azure',
  code: 'pt-BR-ThalitaNeural',
}

const imageDescriptionVoice: Voice = {
  source: 'azure',
  code: 'pt-BR-AntonioNeural',
}

export const azureVoices = {
  main: mainVoice,
  imageDescription: imageDescriptionVoice,
}

export const audiosFolder = 'audios'

export const audioUploadInput = {
  ContentType: 'audio/mpeg',
}
