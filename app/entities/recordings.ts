import { audiosFolder } from '@/lib/constants'
import {
  BaseCollection,
  getDb,
  OmitTimestamps,
  PaginationParams,
  PaginationResponse,
} from '@/lib/mongodb'
import { ObjectId, UpdateFilter, WithId } from 'mongodb'

// `internal` será usado para nossas vozes geradas internamente
type VoiceSource = 'azure' | 'internal'

export type ChapterType = 'content' | 'image_description'

export interface Voice {
  source: VoiceSource
  code: string
}

export interface Audio {
  fileId: string
  text: string
  voice: Voice
}

export interface Chapter {
  type: ChapterType
  title?: Audio
  content: Audio
}

export interface RecordingCollection extends BaseCollection {
  title: Audio
  chapters: Chapter[]
}

export interface Recording extends RecordingCollection {
  _id: string
}

const getCollection = async () => {
  const db = await getDb()

  return db.collection<RecordingCollection>('recordings')
}

const toObj = (doc: WithId<RecordingCollection>) => ({
  ...doc,
  _id: doc._id.toString(),
})

export const createRecording = async (
  input: OmitTimestamps<RecordingCollection>,
): Promise<Recording> => {
  console.log(`creating recording: ${input.title.text}`)

  const collection = await getCollection()
  const document = {
    ...input,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  const result = await collection.insertOne(document, { ignoreUndefined: true })

  console.log('created recording')

  return {
    ...document,
    _id: result.insertedId.toString(),
  }
}

export const updateRecording = async (
  id: string,
  input: UpdateFilter<OmitTimestamps<RecordingCollection>>,
): Promise<Recording> => {
  const collection = await getCollection()

  const result = await collection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    {
      ...input,
      $set: {
        ...input.$set,
        updatedAt: new Date(),
      },
    },
  )

  if (!result) {
    throw new Error(`Gravação não foi encontrada: ${id}`)
  }

  return toObj(result)
}

export const getRecordings = async (
  pagination: PaginationParams,
): Promise<{ recordings: Recording[]; pagination: PaginationResponse }> => {
  const collection = await getCollection()
  const page = pagination.page || 1
  const pageSize = pagination.pageSize || 25

  console.log(page)

  const [recordings, totalResults] = await Promise.all([
    collection
      .find({})
      .sort({ _id: 1 })
      .limit(pageSize)
      .skip((page - 1) * pageSize)
      .toArray(),
    collection.countDocuments({}),
  ])

  return {
    recordings: recordings.map(toObj),
    pagination: {
      page,
      pageSize,
      totalResults,
      totalPages: totalResults > 0 ? Math.ceil(totalResults / pageSize) : 1,
    },
  }
}

export const getRecording = async (id: string): Promise<Recording> => {
  const collection = await getCollection()
  const result = await collection.findOne({ _id: new ObjectId(id) })

  if (!result) {
    throw new Error(`Gravação não encontrada: ${id}`)
  }

  return toObj(result)
}

export const buildAudioFilePath = (fileId: string) =>
  `${audiosFolder}/${fileId}.mp3`

export const deleteRecording = async (id: string) => {
  const collection = await getCollection()

  await collection.deleteOne({ _id: new ObjectId(id) })
}
