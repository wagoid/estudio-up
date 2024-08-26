import { Audio, ChapterType } from '@/lib/modules/recordings/Recording.entity'
import { Box, IconButton, Paper, Stack } from '@mui/material'
import { useForm } from 'react-hook-form'
import { FormTextField } from '@/components/ui/FormTextField'
import { FC, useEffect, useRef } from 'react'
import { AudioPlayer } from '@/components/ui/AudioPlayer'
import {
  createChapterAction,
  generateChapterAudioAction,
} from '@/lib/modules/recordings/recordings.actions'
import ClearIcon from '@mui/icons-material/Clear'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { requiredString } from '@/lib/validation'
import { FormSubmitButton } from '@/components/ui/FormSubmitButton'
import { zodResolver } from '@hookform/resolvers/zod'
import { RecordingObj } from '@/lib/modules/recordings/Recording.entity'
import {
  FormRadioGroup,
  RadioGroupOption,
} from '@/components/ui/FormRadioGroup'

type DraftAudio = Omit<Audio, 'voice'>

const schema = z.object({
  type: requiredString(),
  title: z.string(),
  content: requiredString(),
})

type FormValues = z.infer<typeof schema>

export type EditingChapter = {
  id?: string
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

const defaultImageDescriptionTitle = 'Descrição de imagem'

const contentChapterType: ChapterType = 'content'
const imageDescriptionChapterType: ChapterType = 'image_description'

const chapterTypeOptions: RadioGroupOption[] = [
  {
    value: contentChapterType,
    label: 'Conteúdo',
  },
  {
    value: imageDescriptionChapterType,
    label: 'Descrição de imagem',
  },
]

export const EditChapterForm: FC<EditChapterFormProps> = ({
  chapter,
  recording,
  onRemove,
  objectStoreUrl,
}) => {
  const { control, handleSubmit, watch, getValues, setValue } =
    useForm<FormValues>({
      defaultValues: {
        type: chapter.type,
        title: chapter.title?.text ?? '',
        content: chapter.content.text,
      },
      resolver: zodResolver(schema),
      mode: 'onBlur',
    })
  const router = useRouter()
  const chapterType = watch('type')

  const onSubmit = handleSubmit(async (formData) => {
    if (chapter.id) {
      await generateChapterAudioAction(recording.id, {
        id: chapter.id,
        type: formData.type as ChapterType,
        titleText: formData.title,
        contentText: formData.content,
      })
    } else {
      await createChapterAction(recording.id, {
        type: formData.type as ChapterType,
        titleText: formData.title,
        contentText: formData.content,
      })
    }
    router.refresh()
  })

  useEffect(() => {
    const title = getValues('title')

    if (chapterType === imageDescriptionChapterType && !title) {
      setValue('title', defaultImageDescriptionTitle)
    } else if (
      chapterType === contentChapterType &&
      title === defaultImageDescriptionTitle
    ) {
      setValue('title', '')
    }
  }, [chapterType, getValues, setValue])

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
        <FormRadioGroup
          control={control}
          name="type"
          label="Tipo do capítulo"
          options={chapterTypeOptions}
        />
        <FormTextField name="title" label="Título" control={control} />
        {chapter.title && (
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
        />
        <AudioPlayer audio={chapter.content} objectStoreUrl={objectStoreUrl} />
        <FormSubmitButton control={control} disableDirtyCheck>
          {chapter.id ? 'Gerar áudio' : 'Criar capítulo'}
        </FormSubmitButton>
      </Stack>
    </Box>
  )
}
