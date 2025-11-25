'use client';

import React from 'react';
import { formatPrice } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import { ICoinGlobalMarketsData } from '@/types';
import { Divider } from '@telegram-apps/telegram-ui';

interface IProps {
  cryptoMarketsData: ICoinGlobalMarketsData[];
  className?: string;
}

export const DetailsMarketsData: React.FC<IProps> = ({
  cryptoMarketsData,
  className,
}) => {
  const { t } = useTranslation();

  return (
    <div className={'flex flex-col items-center justify-center w-full mb-16'}>
      <div
        className={
          'flex justify-between items-end w-full text-xs text-neutral-03 mb-0.5 font-medium px-6'
        }
      >
        <span>{t('crypto_details_popup.exchange')}</span>
        <h3 className={'text-sm text-base-foreground pl-2'}>
          {t('crypto_details_popup.markets')}
        </h3>
        <span>{t('crypto_details_popup.volume_24h')}</span>
      </div>

      <div className={'w-full py-3 text-sm font-medium text-foreground'}>
        {cryptoMarketsData.map((item, index) => (
          <React.Fragment key={index}>
            <div className={`flex justify-between mb-1 pb-1`}>
              <p>{item.exchange}</p>
              <p>{formatPrice(item.volume_24h)} $</p>
            </div>

            {index !== cryptoMarketsData.length - 1 ? <Divider /> : ''}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
