'use server'

import { signIn, signOut } from '@/lib/auth'

export const signInAction = () => signIn()

export const signOutAction = () => signOut()
