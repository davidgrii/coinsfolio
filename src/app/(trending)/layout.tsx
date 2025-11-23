import React from 'react'
import { AppDashboard, AppMenu } from '@/components'


export default function Layout({ children }: {
  children: React.ReactNode
}) {
  return (
    <>
      <AppDashboard variant={'public'} />
      {children}
      <AppMenu />
    </>
  )
}
