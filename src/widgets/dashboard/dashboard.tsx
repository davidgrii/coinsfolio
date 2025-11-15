import React from 'react'
import { Layout } from '@/features/global-data/ui/layout'
import { GlobalDashboard } from '@/features/global-data/ui/global-dashboard'
import { PortfolioDashboard } from '@/features/global-data'

interface IProps {
  variant: 'public' | 'portfolio' | 'friends'
}

export const Dashboard: React.FC<IProps> = ({ variant }) => {
  let dashboardContent

  if (variant === 'portfolio') {
    dashboardContent = <PortfolioDashboard />;
  } else {
    dashboardContent = <GlobalDashboard />;
  }

  return (
    <Layout dashboard={dashboardContent} />
  )
}
