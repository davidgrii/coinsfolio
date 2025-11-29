'use client'
import React from 'react';
import { GlobalDashboard } from '@/components/dashboard/global-dashboard';
import { PortfolioDashboard } from '@/components/dashboard/portfolio-dashboard';
import { usePlatform } from '@/hooks/use-platfrom'
import { cn } from '@/components/ui/utils'

interface IProps {
  variant: 'public' | 'portfolio';
}

export const AppDashboard: React.FC<IProps> = ({ variant }) => {
  const platform = usePlatform();

  return (
    <div className={cn('px-3 pb-2', (platform === 'ios' || platform === 'macos') && 'pt-2')}>
      {variant === 'public' ? <GlobalDashboard /> : <PortfolioDashboard />}
    </div>
  );
};
