import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'

import { CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from '@/components/theme'

export const metadata = {
  title: 'Estúdio - Unidade Popular',
  description: 'Estúdio de produção de conteúdo da Unidade Popular',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body style={{ height: '100%' }}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline></CssBaseline>
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
