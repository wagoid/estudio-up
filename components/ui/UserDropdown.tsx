import Image from 'next/image'
import { User } from 'next-auth'
import { FC } from 'react'
import { Box, Button, Divider, Popover, Typography } from '@mui/material'
import {
  bindPopover,
  bindTrigger,
  usePopupState,
} from 'material-ui-popup-state/hooks'
import { signInAction, signOutAction } from 'app/actions/user'

export const UserDropdown: FC<{ user?: User }> = ({ user }) => {
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'user-dropdown',
  })
  const userInitials = user?.name?.split(' ').join('+')

  return (
    <>
      <Button
        variant="outlined"
        size="small"
        sx={{ padding: 0, minWidth: 0 }}
        {...bindTrigger(popupState)}
      >
        <Image
          src={
            user?.image ?? `https://ui-avatars.com/api/?name=${userInitials}`
          }
          width={36}
          height={36}
          alt="Imagem do usuário"
          style={{
            borderRadius: '50%',
            overflow: 'hidden',
            objectFit: 'cover',
          }}
        />
      </Button>
      <Popover
        {...bindPopover(popupState)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        {user ? (
          <Box sx={{ py: 1 }}>
            <Box sx={{ px: 1 }}>
              <Typography variant="body1" sx={{ fontWeight: '700' }}>
                {user.name}
              </Typography>
              <Typography variant="body2">{user.email}</Typography>
            </Box>
            <Divider sx={{ my: 1 }} />
            <form action={signOutAction}>
              <Button
                type="submit"
                variant="text"
                fullWidth
                sx={{ justifyContent: 'flex-start' }}
                onClick={popupState.close}
              >
                Sair
              </Button>
            </form>
          </Box>
        ) : (
          <form action={signInAction}>
            <Button
              type="submit"
              variant="text"
              sx={{ justifyContent: 'flex-start' }}
              onClick={popupState.close}
            >
              Entrar
            </Button>
          </form>
        )}
      </Popover>
    </>
  )
}
