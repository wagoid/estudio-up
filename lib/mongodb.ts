import { Document, MongoClient, MongoClientOptions } from 'mongodb'

export interface BaseCollection {
  createdAt: Date
  updatedAt: Date
}

export interface PaginationParams {
  page?: number

  pageSize?: number
}

export interface PaginationResponse {
  page: number

  pageSize: number

  totalPages: number

  totalResults: number
}

export type OmitTimestamps<TSchema> = Omit<TSchema, 'createdAt' | 'updatedAt'>

if (!process.env.MONGODB_URI) {
  throw new Error('Variável de ambiente é obrigatória: "MONGODB_URI"')
}

const uri = process.env.MONGODB_URI
const options: MongoClientOptions = { appName: 'estudio-up' }

// Export a module-scoped MongoClient. By doing this in a
// separate module, the client can be shared across functions.
let client: MongoClient
let isConnected: boolean

type GlobalWithMongo = typeof globalThis & {
  _mongoClient?: MongoClient
  _mongoClientConnected?: boolean
}

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  const globalWithMongo = global as GlobalWithMongo

  if (!globalWithMongo._mongoClient) {
    globalWithMongo._mongoClient = new MongoClient(uri, options)
  }
  client = globalWithMongo._mongoClient
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options)
}

export const getDbClient = async () => {
  if (isConnected) {
    return client
  }

  console.log('connecting to MongoDB')
  await client.connect()
  console.log('connected to MongoDB')

  if (process.env.NODE_ENV === 'development') {
    const globalWithMongo = global as GlobalWithMongo
    globalWithMongo._mongoClientConnected = true
    isConnected = globalWithMongo._mongoClientConnected
  } else {
    isConnected = true
  }

  return client
}

export const getDb = async () => {
  const client = await getDbClient()

  return client.db('estudio_up')
}
