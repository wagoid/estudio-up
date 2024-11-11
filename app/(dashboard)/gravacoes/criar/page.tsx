import { CreateRecordingForm } from './_components/CreateRecordingForm'
import { getVoicesAction } from '@/lib/modules/tts/tts.actions'

export default async function CreateRecording() {
  const voices = await getVoicesAction()

  return <CreateRecordingForm voices={voices} />
}
