import React from 'react'
import { Layout } from '@/widgets/main-nav/_ui/layout'
import { Navbar } from '@/widgets/main-nav/_ui/navbar'

interface IProps {
  className?: string
}

export const NavMenu: React.FC<IProps> = ({ className }) => {

  return (
    <Layout nav={<Navbar />} />
  )
}
