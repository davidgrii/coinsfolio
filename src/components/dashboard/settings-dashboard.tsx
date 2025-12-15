'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import {
  Avatar,
  Caption,
  Subheadline,
} from '@telegram-apps/telegram-ui';
import { useUser } from '@/app/_providers/user-provider';

export const SettingsDashboard = () => {
  const { user } = useUser();
  const { t } = useTranslation();

  if (!user) return null;

  return (
    <div className='relative'>
      <Card
        className={
          'bg-neutral-04 py-4 px-5 items-center justify-between rounded-xl border-0 cursor-pointer select-none'
        }
      >
        <CardContent className='flex justify-between p-0'>
          <div className={'flex items-center gap-3'}>
            <div className='rounded-full overflow-hidden'>
              <Avatar
                fetchPriority='high'
                size={48}
                src={user.photo_url || '/assets/images/avatar.png'}
                alt={user.username || 'Avatar'}
                className='!bg-transparent'
              />
            </div>

            <div className='flex flex-col'>
              <Subheadline weight='2'>
                {user.username || user.first_name}
              </Subheadline>
              <Caption level='2' weight='3' className='text-neutral-03'>
                {t('settings_page.dashboard.premium')}
              </Caption>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
