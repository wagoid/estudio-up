import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { Recording } from './lib/modules/recordings/Recording.entity'
import { requiredEnvVar } from './lib/env'
import { CreateRecording1723050027208 } from './migrations/1723050027208-CreateRecording'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: requiredEnvVar('POSTGRES_HOST'),
  database: requiredEnvVar('POSTGRES_DATABASE'),
  username: requiredEnvVar('POSTGRES_USER'),
  password: requiredEnvVar('POSTGRES_PASSWORD'),
  port: Number.parseInt(requiredEnvVar('POSTGRES_PORT')),
  synchronize: false,
  logging: false,
  entities: [Recording],
  migrations: [CreateRecording1723050027208],
  subscribers: [],
})
