'use client';

import React, { PropsWithChildren } from 'react';
import { AppRoot } from '@telegram-apps/telegram-ui';

export const TelegramProvider = ({ children }: PropsWithChildren) => {
  // const lp = useLaunchParams();

  // const isDark = useSignal(miniApp.isDark);
  // const initDataUser = useSignal(initData.user);

  // useEffect(() => {
  //   initDataUser && setLocale(initDataUser.language_code);
  // }, [initDataUser]);

  return <AppRoot appearance='dark'>{children}</AppRoot>;
};
