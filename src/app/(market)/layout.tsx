import React, { type PropsWithChildren } from 'react';
import { AppDashboard} from '@/components';
import { CryptoItemModal } from '@/components/crypto-detail-modal';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <AppDashboard variant={'public'} />
      {children}
      <CryptoItemModal />
    </>
  );
}
