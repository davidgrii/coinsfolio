import React from 'react'
import { AppDashboard, AppMenu } from '@/components'


export default function Layout({ children }: {
  children: React.ReactNode
}) {
  return (
    <section className={'h-screen overflow-x-hidden overflow-y-hidden'}>
      <div className={'overflow-y-auto h-full pb-[89px]'}>
        <AppDashboard variant={'public'} />
        {children}
        <AppMenu />
      </div>
    </section>
  )
}
