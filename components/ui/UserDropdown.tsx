import Image from 'next/image'
import { User } from 'next-auth'
import { FC } from 'react'
import { Button, Popover } from '@mui/material'
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

  return (
    <>
      <Button
        variant="outlined"
        size="small"
        sx={{ padding: 0, minWidth: 0 }}
        {...bindTrigger(popupState)}
      >
        <Image
          src={user?.image ?? '/placeholder-user.jpg'}
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
          <form action={signOutAction}>
            <Button type="submit" variant="text" onClick={popupState.close}>
              Sair
            </Button>
          </form>
        ) : (
          <form action={signInAction}>
            <Button type="submit" variant="text" onClick={popupState.close}>
              Entrar
            </Button>
          </form>
        )}
      </Popover>
    </>
  )
}
