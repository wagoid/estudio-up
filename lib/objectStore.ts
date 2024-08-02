import {
  PutObjectCommand,
  GetObjectCommand,
  S3Client,
  DeleteObjectCommand,
  PutObjectCommandInput,
} from '@aws-sdk/client-s3'
import { StreamingBlobPayloadInputTypes } from '@smithy/types'

const bucket = process.env.AWS_BUCKET_NAME

const client = new S3Client({
  endpoint: process.env.AWS_S3_ENDPOINT_URL,
  forcePathStyle: process.env.AWS_S3_FORCE_PATH_STYLE === 'true',
  region: process.env.AWS_REGION,
  maxAttempts: 2,
})

export const uploadFile = async (
  key: string,
  body: StreamingBlobPayloadInputTypes,
  input?: Omit<PutObjectCommandInput, 'Bucket' | 'Key' | 'Body'>,
) => {
  console.log(`uploading file: ${key}`)

  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    Body: body,
    ...input,
  })

  const response = await client.send(command)

  console.log(`uploaded file: ${key}`)

  return response
}

export const deleteFile = async (key: string) => {
  console.log(`deleting file: ${key}`)

  const command = new DeleteObjectCommand({
    Bucket: bucket,
    Key: key,
  })

  const response = await client.send(command)

  console.log(`deleted file: ${key}`)

  return response
}

export const getFile = async (key: string) => {
  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: key,
  })

  return client.send(command)
}
