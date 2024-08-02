import { audiosFolder } from '@/lib/constants'
import { getFile } from '@/lib/objectStore'

type StreamAudioParams = {
  filename: string
}

export async function GET(
  _request: Request,
  { params: { filename } }: { params: StreamAudioParams },
) {
  const file = await getFile(`${audiosFolder}/${filename}`)

  const response = new Response(file.Body as ReadableStream)

  if (file.ContentType) {
    response.headers.set('content-type', file.ContentType)
  }
  if (file.ContentLength) {
    response.headers.set('content-length', file.ContentLength.toString())
  }

  response.headers.set('cache-control', 'max-age=31536000')

  return response
}
