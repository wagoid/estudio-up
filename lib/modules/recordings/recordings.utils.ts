import { getDataSource, PaginationParams, PaginationResponse } from '@/lib/db'
import { Recording, RecordingData } from './Recording.entity'
import { audiosFolder } from './recordings.constants'

export const buildAudioFilePath = (fileId: string) =>
  `${audiosFolder}/${fileId}.mp3`

const getRepository = async () => {
  const dataSource = await getDataSource()

  return dataSource.getRepository(Recording)
}

export const createRecording = async (
  input: RecordingData,
): Promise<Recording> => {
  console.log(`creating recording: ${input.title.text}`)
  const repository = await getRepository()

  const recording = new Recording()
  recording.data = input

  await repository.save(recording)

  console.log('created recording')

  return recording
}

export const saveRecording = async (recording: Recording) => {
  const repository = await getRepository()

  return repository.save(recording)
}

export const getRecordings = async (
  pagination: PaginationParams,
): Promise<{ recordings: Recording[]; pagination: PaginationResponse }> => {
  const repository = await getRepository()
  const page = pagination.page || 1
  const pageSize = pagination.pageSize || 25

  const [recordings, totalResults] = await repository
    .createQueryBuilder()
    .skip((page - 1) * pageSize)
    .take(pageSize)
    .getManyAndCount()

  return {
    recordings,
    pagination: {
      page,
      pageSize,
      totalResults,
      totalPages: totalResults > 0 ? Math.ceil(totalResults / pageSize) : 1,
    },
  }
}

export const getRecording = async (id: string | number): Promise<Recording> => {
  const repository = await getRepository()

  const result = await repository
    .createQueryBuilder()
    .where({ id })
    .getOneOrFail()

  return result
}

export const deleteRecording = async (id: number) => {
  const repository = await getRepository()

  await repository.delete(id)
}
