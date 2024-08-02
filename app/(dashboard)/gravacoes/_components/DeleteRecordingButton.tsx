'use client'

import { IconButton } from '@mui/material'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import { FC } from 'react'
import { useRouter } from 'next/navigation'
import { deleteRecording } from 'app/actions/recordings'

export const DeleteRecordingButton: FC<{ id: string }> = ({ id }) => {
  const router = useRouter()

  return (
    <IconButton
      edge="end"
      title="Remover"
      onClick={async () => {
        await deleteRecording(id)
        router.refresh()
      }}
    >
      <DeleteOutlinedIcon />
    </IconButton>
  )
}
