import React from 'react'
import { AppMenu, Dashboard } from '@/components'


export default function Layout({ children }: {
  children: React.ReactNode
}) {

  return (
    <>
      <Dashboard variant={'public'} />
      {children}
      <AppMenu />
    </>
  )
}
