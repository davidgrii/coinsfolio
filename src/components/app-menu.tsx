'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { APP_NAV_ITEMS } from '@/constants';
import { Tabbar } from '@telegram-apps/telegram-ui';

export const AppMenu = () => {
  const currentPage = usePathname();
  const router = useRouter();

  const { t } = useTranslation();

  const handleNavClick = (href: string) => {
    router.push(href);
  };

  return (
    <>
      <Tabbar className='!bg-base-background select-none !pb-3'>
        {APP_NAV_ITEMS.map(({ id, key, href, Icon }) => (
          <Tabbar.Item
            key={id}
            text={t(key)}
            selected={href === currentPage}
            onClick={() => handleNavClick(href)}
          >
            <Icon className={'w-6 h-6'} />
          </Tabbar.Item>
        ))}
      </Tabbar>
    </>
  );
};
