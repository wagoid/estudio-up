import { Voice } from 'app/entities/recordings'

const mainVoice: Voice = {
  source: 'azure',
  code: 'pt-BR-ThalitaNeural',
}

const imageDescriptionVoice: Voice = {
  source: 'azure',
  code: 'pt-BR-ThalitaNeural',
}

export const azureVoices = {
  main: mainVoice,
  imageDescription: imageDescriptionVoice,
}

export const audiosFolder = 'audios'

export const audioUploadInput = {
  ContentType: 'audio/mpeg',
}
