'use client';

import React from 'react';
import { CATEGORIES_NAV_ITEMS } from '@/constants';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { InlineButtons } from '@telegram-apps/telegram-ui';
import { InlineButtonsItem } from '@telegram-apps/telegram-ui/dist/components/Blocks/InlineButtons/components/InlineButtonsItem/InlineButtonsItem';
import { QrCode } from 'lucide-react';
import { cn } from '@/components/ui/utils';

export const Categories = () => {
  const { t } = useTranslation();
  const currentPage = usePathname();
  const router = useRouter();

  const handleClick = (href: string) => {
    router.push(href);
  };

  return (
    <>
      <InlineButtons mode='gray'>
        {CATEGORIES_NAV_ITEMS.map(({ id, href, key, Icon }) => (
          <InlineButtonsItem
            key={id}
            text={t(`CATEGORIES_NAV_ITEMS.${key}`)}
            onClick={() => handleClick(href)}
            className={cn(href === currentPage && '!text-primary')}
          >
            {id === 'favorites' ? (
              <Icon className='w-4 h-4' />
            ) : (
              <Icon className='w-5 h-5' />
            )}
          </InlineButtonsItem>
        ))}
      </InlineButtons>
    </>
  );
};
