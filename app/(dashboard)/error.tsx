'use client'

import { Box, Button, Stack, Typography } from '@mui/material'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <Stack alignItems="flex-start" padding={2}>
      <Typography
        variant="h4"
        component="h2"
        color={(theme) => theme.palette.error.main}
      >
        Erro na aplicação 😭
      </Typography>
      <Button variant="contained" onClick={() => reset()}>
        Tentar novamente
      </Button>
      {process.env.NODE_ENV === 'development' && (
        <>
          <Typography color={(theme) => theme.palette.error.main}>
            Error: <pre>{error.message}</pre>
          </Typography>
          <pre>{error.stack}</pre>
        </>
      )}
    </Stack>
  )
}
