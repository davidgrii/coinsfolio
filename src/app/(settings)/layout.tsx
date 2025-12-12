import React from 'react';
import { AppDashboard } from '@/components';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppDashboard variant={'settings'} />
      {children}
    </>
  );
}
