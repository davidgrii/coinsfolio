'use client';

import React from 'react';
import { formatPrice } from '@/lib/utils';
import { IMarketsCoinData } from '@/types';
import { useTranslation } from 'react-i18next';
import { Divider } from '@telegram-apps/telegram-ui';

interface IProps {
  cryptoMarketCoinData: IMarketsCoinData;
  className?: string;
}

export const DetailsCoinsData: React.FC<IProps> = ({
  cryptoMarketCoinData,
  className,
}) => {
  const { t } = useTranslation();

  return (
    <div className={'flex flex-col items-center justify-center w-full mb-10'}>
      <h3 className={'text-sm mb-0.5'}>
        {t('crypto_details_popup.coins_data')}
      </h3>

      <div
        className={
          'bg-accent w-full flex flex-col rounded-xl gap-0.5 text-sm font-medium  text-nowrap'
        }
      >
        <div className={'flex justify-between'}>
          <p>{t('crypto_details_popup.coin_data_table.market_cap')}</p>
          <p>{formatPrice(cryptoMarketCoinData?.market_cap)} $</p>
        </div>

        <Divider />

        <div className={'flex justify-between'}>
          <p>{t('crypto_details_popup.coin_data_table.fdv')}</p>
          <p>{formatPrice(cryptoMarketCoinData?.fdv)} $</p>
        </div>

        <Divider />

        <div className={'flex justify-between'}>
          <p>{t('crypto_details_popup.coin_data_table.volume_24h')}</p>
          <p>{formatPrice(cryptoMarketCoinData?.volume_24h)} $</p>
        </div>

        <Divider />

        <div className={'flex justify-between'}>
          <p>{t('crypto_details_popup.coin_data_table.circulation_supply')}</p>
          <p>
            {formatPrice(
              Number(cryptoMarketCoinData?.circulating_supply.toFixed()),
            )}
          </p>
        </div>

        <Divider />

        <div className={'flex justify-between'}>
          <p>{t('crypto_details_popup.coin_data_table.total_supply')}</p>
          <p>
            {formatPrice(Number(cryptoMarketCoinData?.total_supply.toFixed()))}
          </p>
        </div>

        <Divider />

        <div className={'flex justify-between'}>
          <p>{t('crypto_details_popup.coin_data_table.ath')}</p>
          <p>{formatPrice(cryptoMarketCoinData?.all_time_high)} $</p>
        </div>
      </div>
    </div>
  );
};
