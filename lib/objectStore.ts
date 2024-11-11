import {
  PutObjectCommand,
  GetObjectCommand,
  S3Client,
  DeleteObjectCommand,
  PutObjectCommandInput,
} from '@aws-sdk/client-s3'
import { StreamingBlobPayloadInputTypes } from '@smithy/types'
import { writeFile } from 'fs/promises'
import { tmpdir } from 'os'
import pRetry from 'p-retry'
import { basename, resolve } from 'path'
import { Stream } from 'stream'
import { RETRY_OPTIONS } from './constants'
import { createReadStream } from 'fs'
import { execa } from 'execa'

const bucket = process.env.AWS_BUCKET_NAME

const client = new S3Client({
  endpoint: process.env.AWS_S3_ENDPOINT_URL,
  forcePathStyle: process.env.AWS_S3_FORCE_PATH_STYLE === 'true',
  region: process.env.AWS_REGION,
  maxAttempts: 2,
})

export const uploadFile = async (
  key: string,
  object: StreamingBlobPayloadInputTypes,
  input?: Omit<PutObjectCommandInput, 'Bucket' | 'Key' | 'Body'>,
) => {
  console.log(`uploading file: ${key}`)

  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    Body: typeof object === 'string' ? createReadStream(object) : object,
    ...input,
  })

  const response = await pRetry(() => client.send(command), RETRY_OPTIONS)

  if (typeof object === 'string') {
    await execa`rm -f ${object}`
  }

  console.log(`uploaded file: ${key}`)

  return response
}

export const deleteFile = async (key: string) => {
  console.log(`deleting file: ${key}`)

  const command = new DeleteObjectCommand({
    Bucket: bucket,
    Key: key,
  })

  const response = await pRetry(() => client.send(command), RETRY_OPTIONS)

  console.log(`deleted file: ${key}`)

  return response
}

export const getFile = async (key: string) => {
  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: key,
  })

  const result = await pRetry(() => client.send(command), RETRY_OPTIONS)

  return result
}

export const downloadFile = async (key: string) => {
  console.log(`downloading file: ${key}`)

  const file = await getFile(key)
  const filename = basename(key)
  const outputFilename = resolve(tmpdir(), filename)

  await writeFile(outputFilename, file.Body as Stream)

  return outputFilename
}
