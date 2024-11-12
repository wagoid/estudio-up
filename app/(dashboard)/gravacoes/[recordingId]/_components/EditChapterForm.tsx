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
import { defaultVoices } from '@/lib/modules/recordings/recordings.constants'
import { FormSelect } from '@/components/ui/FormSelect'

type DraftAudio = Audio

const schema = z.object({
  type: requiredString(),
  title: z.string(),
  content: requiredString(),
  voice: requiredString(),
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
  voices: string[]
  index: number
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

const getDefaultVoiceForType = (voices: string[], chapterType: ChapterType) => {
  const defaultVoiceForType =
    chapterType === 'image_description'
      ? defaultVoices.imageDescription.code
      : defaultVoices.main.code

  return voices.find((voice) => voice === defaultVoiceForType)
}

export const EditChapterForm: FC<EditChapterFormProps> = ({
  chapter,
  recording,
  onRemove,
  objectStoreUrl,
  voices,
  index,
}) => {
  const { control, handleSubmit, watch, getValues, setValue, reset } =
    useForm<FormValues>({
      defaultValues: {
        type: chapter.type,
        title: chapter.title?.text ?? '',
        content: chapter.content.text,
        voice:
          voices.find((voice) => voice === chapter.content.voice.code) ??
          getDefaultVoiceForType(voices, chapter.type) ??
          voices[0],
      },
      resolver: zodResolver(schema),
      mode: 'onBlur',
    })
  const router = useRouter()
  const chapterType = watch('type')
  const voiceOptions = voices.map((voice) => ({ label: voice, value: voice }))

  const onSubmit = handleSubmit(async (formData) => {
    if (chapter.id) {
      await generateChapterAudioAction(recording.id, {
        id: chapter.id,
        type: formData.type as ChapterType,
        titleText: formData.title,
        contentText: formData.content,
        voiceCode: formData.voice,
      })
    } else {
      await createChapterAction(recording.id, {
        type: formData.type as ChapterType,
        titleText: formData.title,
        contentText: formData.content,
        voiceCode: formData.voice,
      })
    }
    router.refresh()
  })

  useEffect(() => {
    const title = getValues('title')
    const defaultVoiceForType =
      getDefaultVoiceForType(voices, chapterType as ChapterType) ??
      getValues('voice')

    if (chapterType === imageDescriptionChapterType && !title) {
      setValue('title', defaultImageDescriptionTitle)
      setValue('voice', defaultVoiceForType)
    } else if (
      chapterType === contentChapterType &&
      title === defaultImageDescriptionTitle
    ) {
      setValue('title', '')
      setValue('voice', defaultVoiceForType)
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
        <FormSelect
          idSuffix={index.toString()}
          name="voice"
          label="Voz"
          options={voiceOptions}
          control={control}
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
