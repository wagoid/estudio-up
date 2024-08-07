'use client'

import { IconButton } from '@mui/material'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import { FC } from 'react'
import { useRouter } from 'next/navigation'
import { deleteRecordingAction } from '@/lib/modules/recordings/recordings.actions'

export const DeleteRecordingButton: FC<{ id: number }> = ({ id }) => {
  const router = useRouter()

  return (
    <IconButton
      edge="end"
      title="Remover"
      onClick={async () => {
        await deleteRecordingAction(id)
        router.refresh()
      }}
    >
      <DeleteOutlinedIcon />
    </IconButton>
  )
}
