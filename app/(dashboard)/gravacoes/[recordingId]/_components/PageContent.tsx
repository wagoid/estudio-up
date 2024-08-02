'use client'

import { Recording } from 'app/entities/recordings'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Stack,
} from '@mui/material'
import { FC, useEffect, useState } from 'react'
import { generateId } from '@/lib/id'
import { EditingChapter, EditChapterForm } from './EditChapterForm'
import { deleteChapter } from 'app/actions/recordings'
import { useRouter } from 'next/navigation'
import { GenerateMergedAudioButton } from '../../_components/GenerateMergedAudioButton'
import { EditTitleForm } from './EditTitleForm'

type PageContentProps = {
  recording: Recording
}

export const PageContent: FC<PageContentProps> = ({ recording }) => {
  const [editingChapters, setEditingChapters] = useState<EditingChapter[]>(
    recording.chapters,
  )
  const router = useRouter()

  useEffect(() => {
    setEditingChapters(recording.chapters)
  }, [recording])

  const onRemoveChapter = async (chapter: EditingChapter) => {
    if (chapter.isDraft) {
      setEditingChapters((prev) =>
        prev.filter(({ content }) => content.fileId !== chapter.content.fileId),
      )
    } else {
      await deleteChapter(recording._id, chapter.content.fileId)
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
    </Stack>
  )
}
