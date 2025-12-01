'use client'

import { createContext, type PropsWithChildren, useContext } from 'react'
import { useLaunchParams } from '@tma.js/sdk-react'
import type { IUser } from '@/types'

interface IUserProvider {
  user: IUser | undefined;
  userId: string;
  isLoading: boolean;
}

const UserContext = createContext<IUserProvider | undefined>(undefined)

export function UserProvider({ children}: PropsWithChildren) {
  const lp = useLaunchParams();
  const userId = String(lp.tgWebAppData?.user?.id) || '';

  return <UserContext.Provider value={{ user: lp.tgWebAppData?.user, userId, isLoading: !lp.tgWebAppData }}>{children}</UserContext.Provider>
}

export function useUser() {
  const context = useContext(UserContext)

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}