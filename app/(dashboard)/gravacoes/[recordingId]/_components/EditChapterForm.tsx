import { Audio, ChapterType } from '@/lib/modules/recordings/Recording.entity'
import { Box, IconButton, Paper, Stack } from '@mui/material'
import { useForm } from 'react-hook-form'
import { FormTextField } from '@/components/ui/FormTextField'
import { FC } from 'react'
import { AudioPlayer } from '@/components/ui/AudioPlayer'
import { upsertChapterAction } from '@/lib/modules/recordings/recordings.actions'
import ClearIcon from '@mui/icons-material/Clear'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { requiredString } from '@/lib/validation'
import { FormSubmitButton } from '@/components/ui/FormSubmitButton'
import { zodResolver } from '@hookform/resolvers/zod'
import { RecordingObj } from '@/lib/modules/recordings/Recording.entity'

type DraftAudio = Omit<Audio, 'voice'>

const schema = z.object({
  type: requiredString(),
  title: z.string(),
  content: requiredString(),
})

type FormValues = z.infer<typeof schema>

export type EditingChapter = {
  isDraft?: boolean
  type: ChapterType
  title?: DraftAudio
  content: DraftAudio
}

type EditChapterFormProps = {
  chapter: EditingChapter
  recording: RecordingObj
  onRemove: (chapter: EditingChapter) => Promise<void>
  objectStoreUrl: string
}

export const EditChapterForm: FC<EditChapterFormProps> = ({
  chapter,
  recording,
  onRemove,
  objectStoreUrl,
}) => {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      type: chapter.type,
      title: chapter.title?.text ?? '',
      content: chapter.content.text,
    },
    resolver: zodResolver(schema),
    mode: 'onBlur',
  })
  const router = useRouter()

  const onSubmit = handleSubmit(async (formData) => {
    await upsertChapterAction(recording.id, {
      titleId: chapter.title?.fileId,
      contentId: chapter.content.fileId,
      type: formData.type as ChapterType,
      titleText: formData.title,
      contentText: formData.content,
    })
    router.refresh()
  })

  return (
    <Box
      key={chapter.content.fileId}
      component="form"
      noValidate
      autoComplete="off"
      sx={{ position: 'relative' }}
      onSubmit={onSubmit}
    >
      <IconButton
        title="Remover capítulo"
        sx={(theme) => ({
          position: 'absolute',
          right: 0,
          top: 0,
          color: theme.palette.text.primary,
        })}
        onClick={() => onRemove(chapter)}
      >
        <ClearIcon />
      </IconButton>
      <Stack
        alignItems="flex-start"
        component={Paper}
        padding={2}
        variant="outlined"
      >
        <FormTextField
          name="title"
          label="Título"
          control={control}
          defaultValue={chapter.title?.text ?? ''}
        />
        {!chapter.isDraft && chapter.title && (
          <AudioPlayer audio={chapter.title} objectStoreUrl={objectStoreUrl} />
        )}
        <FormTextField
          name="content"
          label="Texto"
          multiline
          fullWidth
          minRows={2}
          control={control}
          required
          defaultValue={chapter.content.text}
        />
        {!chapter.isDraft && (
          <AudioPlayer
            audio={chapter.content}
            objectStoreUrl={objectStoreUrl}
          />
        )}
        <FormTextField
          type="hidden"
          name="type"
          defaultValue={chapter.type}
          control={control}
        />
        <FormSubmitButton control={control}>Gerar áudio</FormSubmitButton>
      </Stack>
    </Box>
  )
}
