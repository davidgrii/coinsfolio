'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { APP_NAV_ITEMS } from '@/constants';
import { Tabbar } from '@telegram-apps/telegram-ui';
import { usePlatform } from '@/hooks/use-platfrom'
import { cn } from '@/components/ui/utils'

export const AppMenu = () => {
  const currentPage = usePathname();
  const router = useRouter();
  const platform = usePlatform();

  const { t } = useTranslation();

  const handleNavClick = (href: string) => {
    router.push(href);
  };

  return (
    <>
      <Tabbar className={cn('!bg-base-background select-none !z-50')}>
        {APP_NAV_ITEMS.map(({ id, key, href, Icon }) => (
          <Tabbar.Item
            key={id}
            text={t(key)}
            selected={href === currentPage}
            onClick={() => handleNavClick(href)}
            className={cn(
              platform === 'ios' && '!pb-4' ||
              platform === 'macos' && '!pb-2'
            )}
          >
            <Icon className={'w-6 h-6'} />
          </Tabbar.Item>
        ))}
      </Tabbar>
    </>
  );
};
