import { getDataSource, PaginationParams, PaginationResponse } from '@/lib/db'
import { Recording, RecordingData } from './Recording.entity'
import { audiosFolder } from './recordings.constants'

export const buildAudioFilename = (fileId: string) => `${fileId}.mp3`

export const buildAudioFilePath = (fileId: string) =>
  `${audiosFolder}/${buildAudioFilename(fileId)}`

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

export type GetRecordingsParams = {
  query?: string
}

export const getRecordings = async (
  pagination: PaginationParams,
  { query }: GetRecordingsParams,
): Promise<{ recordings: Recording[]; pagination: PaginationResponse }> => {
  const repository = await getRepository()
  const page = pagination.page || 1
  const pageSize = pagination.pageSize || 25

  let queryBuilder = repository.createQueryBuilder()

  if (query) {
    queryBuilder = queryBuilder.where(
      "data->'title'->>'text' ILIKE '%' || :query || '%'",
      {
        query,
      },
    )
  }

  const [recordings, totalResults] = await queryBuilder
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

const acronymLetterToWord: Record<string, string> = {
  A: 'á',
  B: 'bê',
  C: 'cê',
  D: 'dê',
  E: 'é',
  F: 'éfe',
  G: 'gê',
  H: 'agá',
  I: 'í',
  J: 'jóta',
  K: 'cá',
  L: 'éle',
  M: 'ême',
  N: 'êne',
  O: 'ó',
  P: 'pê',
  Q: 'quê',
  R: 'érre',
  S: 'ésse',
  T: 'tê',
  U: 'ú',
  V: 'vê',
  W: 'dábliu',
  X: 'xís',
  Y: 'ípisilon',
  Z: 'zê',
}

export const normalizeTextForTTS = (text: string) => {
  return text.replaceAll(/(^| |\()(?:[A-Z]){2,}/gm, (acronym) =>
    acronym
      .split('')
      .map((char) => acronymLetterToWord[char] ?? char)
      .join(''),
  )
}
