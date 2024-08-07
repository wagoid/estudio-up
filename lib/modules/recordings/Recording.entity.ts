import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm'

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

export interface RecordingData {
  title: Audio
  chapters: Chapter[]
}

export interface RecordingObj {
  id: number
  createdAt: Date
  updatedAt: Date
  data: RecordingData
}

@Entity({
  name: 'recording',
  orderBy: {
    id: 'ASC',
  },
})
export class Recording implements RecordingObj {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @Column({ type: 'jsonb' })
  data: RecordingData
}
