'use client';

import React, { PropsWithChildren } from 'react'
import { AppRoot } from '@telegram-apps/telegram-ui';
import { useDidMount } from '@/hooks/use-did-mount';
import ErrorPage from '@/app/error'
import { ErrorBoundary } from '@/components/error-boundary'
import { init, backButton, useLaunchParams, initData, useSignal } from '@tma.js/sdk-react'

export const TelegramProviderInner = ({ children }: PropsWithChildren) => {
  const lp = useLaunchParams();

  init()
  backButton.mount()
  // const isDark = useSignal(miniApp.isDark);
  // const initDataUser = useSignal(initData.user);


  // useEffect(() => {
  //   initDataUser && setLocale(initDataUser.language_code);
  // }, [initDataUser]);

  return <AppRoot
    appearance='dark'
    platform={
      ['macos', 'ios'].includes(lp.tgWebAppPlatform) ? 'ios' : 'base'
    }
  >
    {children}
  </AppRoot>;
};

export function TelegramProvider(props: PropsWithChildren) {
  const didMount = useDidMount();

  return didMount ? (
    <ErrorBoundary fallback={ErrorPage}>
      <TelegramProviderInner {...props} />
    </ErrorBoundary>
  ) : null;
}