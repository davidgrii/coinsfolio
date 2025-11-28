'use client';

import React, { PropsWithChildren } from 'react';
import { AppRoot } from '@telegram-apps/telegram-ui';
import { useDidMount } from '@/hooks/use-did-mount';
import ErrorPage from '@/app/error'
import { ErrorBoundary } from '@/components/error-boundary'
import { useLaunchParams } from '@telegram-apps/sdk-react'

export const TelegramProviderInner = ({ children }: PropsWithChildren) => {
  const lp = useLaunchParams();

  // const isDark = useSignal(miniApp.isDark);
  // const initDataUser = useSignal(initData.user);

  // useEffect(() => {
  //   initDataUser && setLocale(initDataUser.language_code);
  // }, [initDataUser]);

  return <AppRoot
    appearance='dark'
    platform={
      ['macos', 'ios'].includes(lp.platform) ? 'ios' : 'base'
    }
  >
    {children}
  </AppRoot>;
};

export function TelegramProvider(props: PropsWithChildren) {
  // Unfortunately, Telegram Mini Apps does not allow us to use all features of
  // the Server Side Rendering. That's why we are showing loader on the server
  // side.
  const didMount = useDidMount();

  return didMount ? (
    <ErrorBoundary fallback={ErrorPage}>
      <TelegramProviderInner {...props} />
    </ErrorBoundary>
  ) : null;
}