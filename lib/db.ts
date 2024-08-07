import Pool from 'pg-pool'
import { requiredEnvVar } from './env'
import { AppDataSource } from 'data-source'

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

export const dbPool = new Pool({
  host: requiredEnvVar('POSTGRES_HOST'),
  database: requiredEnvVar('POSTGRES_DATABASE'),
  user: requiredEnvVar('POSTGRES_USER'),
  password: requiredEnvVar('POSTGRES_PASSWORD'),
  port: Number.parseInt(requiredEnvVar('POSTGRES_PORT')),
  // TODO: check this for prod
  // ssl: true,
  max: 20,
  idleTimeoutMillis: 1000,
  connectionTimeoutMillis: 1000,
})

export const getDataSource = async () => {
  if (AppDataSource.isInitialized) return AppDataSource

  await AppDataSource.initialize()

  return AppDataSource
}
