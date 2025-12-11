import React, { Fragment } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Divider, List } from '@telegram-apps/telegram-ui';
import { motion } from 'framer-motion';
import { Icons } from '@/components/icons';

interface IProps {
  itemsCount: number;
  isPortfolio?: boolean;
  className?: string;
}

export const PortfolioSkeletonList: React.FC<IProps> = ({
  itemsCount = 10,
}) => {
  return (
    <List
      className={
        'w-full grid overflow-y-auto max-h-screen scrollbar-none !pt-1 !px-0'
      }
    >
      {Array.from({ length: itemsCount }).map((_, index) => (
        <Fragment key={index}>
          <div key={index} className={'flex w-full items-center space-x-2'}>
            <Skeleton className='h-[40px] w-[40px] rounded-full' />

            <div className={'flex flex-col gap-0.5 flex-1'}>
              <Skeleton className='h-4 w-full rounded' />
              <Skeleton className='h-1.5 w-[100px] rounded' />
            </div>

            <Icons.portfolioArrow
              className={'w-3 h-3 animate-pulse text-neutral-04'}
            />
          </div>
          <Divider />
        </Fragment>
      ))}
    </List>
  );
};
