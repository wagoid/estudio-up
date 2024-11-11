'use client'

import {
  AppBar,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Toolbar,
  Typography,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import DashboardIcon from '@mui/icons-material/Dashboard'
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver'
import SettingsIcon from '@mui/icons-material/Settings'
import { FC, PropsWithChildren, useState } from 'react'
import Link from 'next/link'
import { UserDropdown } from './UserDropdown'
import { User as AuthUser } from 'next-auth'

const drawerWidth = 240

const AppBarStyled = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<{ open: boolean }>(({ theme, open }) => ({
  borderTop: 'none',
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const DrawerStyled = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}))

const LinkItem: FC<PropsWithChildren<{ href: string; text: string }>> = ({
  href,
  text,
  children,
}) => (
  <ListItemButton title={text} href={href} LinkComponent={Link}>
    <ListItemIcon>{children}</ListItemIcon>
    <ListItemText primary={text} />
  </ListItemButton>
)

export const AppWrapper: FC<PropsWithChildren & { user?: AuthUser }> = ({
  children,
  user,
}) => {
  const [open, setOpen] = useState(false)
  const toggleDrawer = () => {
    setOpen(!open)
  }

  return (
    <>
      <AppBarStyled position="absolute" open={open} variant="outlined">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="Abrir menu"
            onClick={toggleDrawer}
            sx={{ mr: 4, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Estúdio da UP
          </Typography>
          <UserDropdown user={user} />
        </Toolbar>
      </AppBarStyled>
      <DrawerStyled variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer} aria-label="Fechar menu">
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          <LinkItem text="Início" href="/">
            <DashboardIcon />
          </LinkItem>
          <LinkItem text="Gravações" href="/gravacoes">
            <RecordVoiceOverIcon />
          </LinkItem>
          <LinkItem text="Configurações" href="/configuracoes">
            <SettingsIcon />
          </LinkItem>
        </List>
      </DrawerStyled>
      {children}
    </>
  )
}
