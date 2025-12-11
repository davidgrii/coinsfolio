import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { List } from '@telegram-apps/telegram-ui';
import { motion } from 'framer-motion';
import { Icons } from '@/components/icons';

interface IProps {
  itemsCount: number;
  isPortfolio?: boolean;
  className?: string;
}

export const CryptoSkeletonList: React.FC<IProps> = ({
  itemsCount = 10,
  isPortfolio = false,
}) => {
  return (
    <List
      className={
        'w-full grid gap-2 overflow-y-auto max-h-screen scrollbar-none !pt-0 !px-0'
      }
    >
      {Array.from({ length: itemsCount }).map((_, index) => (
        <div key={index} className={'flex w-full items-center space-x-3'}>
          {!isPortfolio && (
            <span className='w-4 animate-pulse text-sm text-neutral-04'>
              {index + 1}
            </span>
          )}

          <Skeleton className='h-[40px] w-[40px] rounded-full' />

          <div className={'flex flex-col gap-0.5 flex-1'}>
            <Skeleton className='h-4 w-full rounded' />
            <Skeleton className='h-1.5 w-[100px] rounded' />
          </div>

          {!isPortfolio ? (
            <button className='p-1 pb-[6px]'>
              <Icons.favorites
                className={'w-4 h-4 animate-pulse text-neutral-04'}
              />
            </button>
          ) : (
            <Icons.portfolioArrow
              className={'w-3 h-3 animate-pulse text-neutral-04'}
            />
          )}
        </div>
      ))}
    </List>
  );
};
