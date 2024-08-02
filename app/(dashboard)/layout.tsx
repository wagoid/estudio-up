import { Analytics } from '@vercel/analytics/react'
import { Box, Toolbar } from '@mui/material'
import { AppWrapper } from '@/components/ui/AppWrapper'
import { auth } from '@/lib/auth'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  return (
    <Box display="flex">
      <AppWrapper user={session?.user}>
        <Box component="main" flexGrow={1} height="100vh" overflow="auto">
          <Toolbar />
          <Box py={{ xs: 2, md: 3 }}>{children}</Box>
          <Analytics />
        </Box>
      </AppWrapper>
    </Box>
  )
}
