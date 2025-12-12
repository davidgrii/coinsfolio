'use client';

import {
  createContext,
  type PropsWithChildren,
  useContext,
  useEffect,
} from 'react';
import { initData, useLaunchParams, useSignal } from '@tma.js/sdk-react';
import type { IUser } from '@/types';
import i18n from '@/i18n';

interface IUserProvider {
  user: IUser | undefined;
  userId: string;
  isLoading: boolean;
}

const UserContext = createContext<IUserProvider | undefined>(undefined);

export function UserProvider({ children }: PropsWithChildren) {
  const lp = useLaunchParams();
  const userId = String(lp.tgWebAppData?.user?.id) || '';

  useEffect(() => {
    if (localStorage.getItem('language'))
      i18n.changeLanguage(localStorage.getItem('language') || 'en');
    // i18n.changeLanguage(lp.tgWebAppData?.user?.language_code || 'en')
  }, []);

  return (
    <UserContext.Provider
      value={{
        user: lp.tgWebAppData?.user,
        userId,
        isLoading: !lp.tgWebAppData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
