import React from 'react'
import { NavMenu } from '@/widgets/main-nav'
import { Dashboard } from '@/widgets/dashboard'

export default function Layout({ children }: {
  children: React.ReactNode;
}) {
  return (
    <section className={'h-screen overflow-x-hidden overflow-y-hidden'}>
      <div className={'overflow-y-auto h-full pb-[89px]'}>
        <Dashboard variant={'portfolio'} />
        {children}
        <NavMenu />
      </div>
    </section>
  )
};
