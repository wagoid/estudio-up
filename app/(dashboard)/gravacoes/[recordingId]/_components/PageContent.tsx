'use client'

import {
  Alert,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'
import { FC, useEffect, useState } from 'react'
import { EditingChapter, EditChapterForm } from './EditChapterForm'
import { deleteChapterAction } from '@/lib/modules/recordings/recordings.actions'
import { useRouter } from 'next/navigation'
import { GenerateMergedAudioButton } from './GenerateMergedAudioButton'
import { EditTitleForm } from './EditTitleForm'
import { RecordingObj } from '@/lib/modules/recordings/Recording.entity'
import { RecordingFileInfo } from '../../_components/RecordingFileInfo'
import { defaultVoices } from '@/lib/modules/recordings/recordings.constants'

type PageContentProps = {
  recording: RecordingObj
  objectStoreUrl: string
  voices: string[]
}

export const PageContent: FC<PageContentProps> = ({
  recording,
  objectStoreUrl,
  voices,
}) => {
  const { chapters } = recording.data
  const [editingChapters, setEditingChapters] =
    useState<EditingChapter[]>(chapters)
  const router = useRouter()
  const hasDraftChapter = editingChapters.some((chapter) => !chapter.id)
  const hasMissingAudio =
    !recording.data.title.fileId ||
    !editingChapters.length ||
    editingChapters.some(
      (chapter) => !chapter.title?.fileId && !chapter.content.fileId,
    )

  useEffect(() => {
    setEditingChapters(chapters)
  }, [chapters])

  const onRemoveChapter = async (chapter: EditingChapter) => {
    if (chapter.id) {
      await deleteChapterAction(recording.id, chapter.id)
      router.refresh()
    } else {
      setEditingChapters((prev) => prev.filter(({ id }) => !!id))
    }
  }

  return (
    <Stack>
      <Card>
        <CardHeader title="Editar título" />
        <CardContent>
          <EditTitleForm
            recording={recording}
            objectStoreUrl={objectStoreUrl}
            voices={voices}
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader title="Editar capítulos" />
        <CardContent component={Stack}>
          {editingChapters.map((draftChapter, index) => (
            <EditChapterForm
              key={draftChapter.title?.fileId ?? index}
              chapter={draftChapter}
              recording={recording}
              onRemove={onRemoveChapter}
              objectStoreUrl={objectStoreUrl}
              voices={voices}
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
                  type: 'content',
                  title: {
                    text: '',
                    voice: defaultVoices.main,
                  },
                  content: {
                    text: '',
                    voice: defaultVoices.main,
                  },
                },
              ])
            }}
          >
            Adicionar capítulo
          </Button>
        </CardActions>
      </Card>
      <Alert color="info" icon={<InfoIcon />} sx={{ alignItems: 'center' }}>
        {hasMissingAudio
          ? 'Gere os áudios do título e dos capítulos para gerar o áudio final'
          : 'Os áudios do título e capítulos serão removidos ao gerar o áudio final'}
      </Alert>
      <GenerateMergedAudioButton
        recording={recording}
        disabled={hasDraftChapter || hasMissingAudio}
        sx={{ alignSelf: 'flex-start' }}
        objectStoreUrl={objectStoreUrl}
      />
      <RecordingFileInfo
        recording={recording}
        objectStoreUrl={objectStoreUrl}
      />
    </Stack>
  )
}
