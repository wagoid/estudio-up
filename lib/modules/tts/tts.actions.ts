'use server'

import { deleteVoice, getVoices, uploadVoice } from './tts.utils'

export const getVoicesAction = () => getVoices()

export const uploadVoiceAction = async (formData: FormData) => {
  const file = formData.get('file') as File

  console.log('file!', typeof file, file)

  await uploadVoice(file)
}

export const deleteVoiceAction = async (voice: string) => {
  await deleteVoice(`${voice}.wav`)
}
