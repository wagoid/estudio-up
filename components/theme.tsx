'use client'
import { Inter } from 'next/font/google'
import { createTheme } from '@mui/material/styles'
import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import { forwardRef } from 'react'

declare module '@mui/material/Link' {
  interface LinkOwnProps extends NextLinkProps {}
}

const inter = Inter({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
})

const LinkComponent = forwardRef<HTMLAnchorElement, NextLinkProps>(
  function LinkComponent(props, ref) {
    return <NextLink ref={ref} {...props} />
  },
)

export const theme = createTheme({
  typography: {
    fontFamily: inter.style.fontFamily,
  },
  palette: {
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#ff1a1a',
    },
  },
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkComponent,
        underline: 'none',
      },
    },
    MuiStack: {
      defaultProps: {
        spacing: 2,
      },
    },
    MuiToolbar: {
      defaultProps: {
        variant: 'dense',
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
})
