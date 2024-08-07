'use client'

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Link,
  Stack,
} from '@mui/material'
import { FC, useEffect, useState } from 'react'
import { generateId } from '@/lib/id'
import { EditingChapter, EditChapterForm } from './EditChapterForm'
import { deleteChapterAction } from '@/lib/modules/recordings/recordings.actions'
import { useRouter } from 'next/navigation'
import { GenerateMergedAudioButton } from './GenerateMergedAudioButton'
import { EditTitleForm } from './EditTitleForm'
import { RecordingObj } from '@/lib/modules/recordings/Recording.entity'
import { buildAudioPath } from '@/lib/urls'
import { RecordingFileInfo } from '../../_components/RecordingFileInfo'

type PageContentProps = {
  recording: RecordingObj
}

export const PageContent: FC<PageContentProps> = ({ recording }) => {
  const [isClient, setIsClient] = useState(false)
  const { chapters, fileId } = recording.data
  const [editingChapters, setEditingChapters] =
    useState<EditingChapter[]>(chapters)
  const router = useRouter()

  useEffect(() => {
    setIsClient(true)
  }, [])

  const finalAudioUrl =
    isClient &&
    fileId &&
    `${window.location.origin}${buildAudioPath({ fileId })}`

  useEffect(() => {
    setEditingChapters(chapters)
  }, [chapters])

  const onRemoveChapter = async (chapter: EditingChapter) => {
    if (chapter.isDraft) {
      setEditingChapters((prev) =>
        prev.filter(({ content }) => content.fileId !== chapter.content.fileId),
      )
    } else {
      await deleteChapterAction(recording.id, chapter.content.fileId)
      router.refresh()
    }
  }

  return (
    <Stack>
      <Card>
        <CardHeader title="Editar título" />
        <CardContent>
          <EditTitleForm recording={recording} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader title="Editar capítulos" />
        <CardContent component={Stack}>
          {editingChapters.map((draftChapter) => (
            <EditChapterForm
              key={draftChapter.content.fileId}
              chapter={draftChapter}
              recording={recording}
              onRemove={onRemoveChapter}
            />
          ))}
        </CardContent>
        <CardActions>
          <Button
            type="button"
            onClick={() => {
              setEditingChapters((prev) => [
                ...prev,
                {
                  isDraft: true,
                  type: 'content',
                  title: {
                    fileId: generateId(),
                    text: '',
                  },
                  content: {
                    fileId: generateId(),
                    text: '',
                  },
                },
              ])
            }}
          >
            Adicionar capítulo
          </Button>
        </CardActions>
      </Card>
      <GenerateMergedAudioButton
        recording={recording}
        disabled={editingChapters.some((chapter) => chapter.isDraft)}
        sx={{ alignSelf: 'flex-start' }}
      />
      <RecordingFileInfo recording={recording} />
    </Stack>
  )
}
