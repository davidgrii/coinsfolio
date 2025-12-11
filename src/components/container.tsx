'use client';

import React, { useEffect } from 'react';
import { cn } from '@/components/ui/utils';
import { useRouter } from 'next/navigation';
import { backButton } from '@tma.js/sdk-react';

interface IProps {
  children: React.ReactNode;
  back: boolean;
  className?: string;
}

export const Container: React.FC<IProps> = ({
  children,
  back = true,
  className,
}) => {
  const router = useRouter();

  useEffect(() => {
    if (back) {
      backButton.show();
    } else {
      backButton.hide();
    }
  }, [back]);

  useEffect(() => {
    return backButton.onClick(() => {
      router.back();
    });
  }, [router]);

  return (
    <div className={cn('mx-auto max-w-3xl px-3 select-none', className)}>
      {children}
    </div>
  );
};
