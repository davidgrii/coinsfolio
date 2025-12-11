import React from 'react'
import { AppDashboard } from '@/components'
import { CryptoItemModal } from '@/components/crypto-detail-modal'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppDashboard variant={'public'} />
      {children}
      <CryptoItemModal />
    </>
  )
}
