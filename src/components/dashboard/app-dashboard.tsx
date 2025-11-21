import React from 'react'
import { GlobalDashboard } from '@/components/dashboard/global-dashboard'
import { PortfolioDashboard } from '@/components/dashboard/portfolio-dashboard'

interface IProps {
  variant: 'public' | 'portfolio'
}

export const AppDashboard: React.FC<IProps> = ({ variant }) => {
  let dashboardContent

  if (variant === 'portfolio') {
    dashboardContent = <PortfolioDashboard />;
  } else {
    dashboardContent = <GlobalDashboard />;
  }

  return (
    <>
      <div className={'max-w-3xl mx-auto p-3'}>
        {dashboardContent}
      </div>
    </>
  )
}
