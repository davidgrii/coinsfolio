import React from 'react';
import { GlobalDashboard } from '@/components/dashboard/global-dashboard';
import { PortfolioDashboard } from '@/components/dashboard/portfolio-dashboard';

interface IProps {
  variant: 'public' | 'portfolio';
}

export const AppDashboard: React.FC<IProps> = ({ variant }) => {
  return (
    <div className='px-3 pt-2'>
      {variant === 'public' ? <GlobalDashboard /> : <PortfolioDashboard />}
    </div>
  );
};
