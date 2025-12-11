'use client';
import React from 'react';
import { GlobalDashboard } from '@/components/dashboard/global-dashboard';
import { PortfolioDashboard } from '@/components/dashboard/portfolio-dashboard';
import { usePlatform } from '@/hooks/use-platfrom';
import { cn } from '@/components/ui/utils';
import { SettingsDashboard } from '@/components/dashboard/settings-dashboard';

interface IProps {
  variant: 'public' | 'portfolio' | 'settings';
}

export const AppDashboard: React.FC<IProps> = ({ variant }) => {
  return (
    <div className={cn('px-3 pb-2 pt-2')}>
      {(variant === 'public' && <GlobalDashboard />) ||
        (variant === 'portfolio' && <PortfolioDashboard />) ||
        (variant === 'settings' && <SettingsDashboard />)
      }
    </div>
  );
};
