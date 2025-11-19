import React from 'react'
import { AppMenu, Dashboard } from '@/components'


export default function Layout({ children }: {
  children: React.ReactNode
}) {
  return (
    <section className={'h-screen overflow-x-hidden overflow-y-hidden'}>
      <div className={'overflow-y-auto h-full pb-[89px]'}>
        <Dashboard variant={'public'} />
        {children}
        <AppMenu />
      </div>
    </section>
  )
}
