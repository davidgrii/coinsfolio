import React, { PropsWithChildren } from 'react';
import { AppDashboard, AppMenu } from '@/components';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <AppDashboard variant={'public'} />
      {children}
      <AppMenu />
    </>
  );
}
