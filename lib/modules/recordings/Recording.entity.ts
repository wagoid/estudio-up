import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm'

// `internal` é usado para nossas vozes geradas por nossa própria ferramenta de TTS
type VoiceSource = 'internal'

export type ChapterType = 'content' | 'image_description'

export interface Voice {
  source: VoiceSource
  code: string
}

export interface Audio {
  fileId?: string
  text: string
  voice: Voice
}

export interface Chapter {
  id: string
  type: ChapterType
  title?: Audio
  content: Audio
}

export interface RecordingData {
  title: Audio
  chapters: Chapter[]
  fileId?: string
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
    id: 'DESC',
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
