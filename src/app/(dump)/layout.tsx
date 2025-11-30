import React from 'react';
import { AppDashboard, AppMenu } from '@/components';
import { CryptoItemModal } from '@/components/crypto-detail-modal'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppDashboard variant={'public'} />
      {children}
      <AppMenu />
      <CryptoItemModal />
    </>
  );
}
