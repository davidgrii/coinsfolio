import React, { type PropsWithChildren } from 'react';
import { AppDashboard, AppMenu } from '@/components';
import { CryptoItemModal } from '@/components/crypto-item-details';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <AppDashboard variant={'public'} />
      {children}
      <AppMenu />
      <CryptoItemModal />
    </>
  );
}
