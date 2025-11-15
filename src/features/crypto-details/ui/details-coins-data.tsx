'use client'

import React from 'react'
import { formatPrice } from '@/shared/utils/formatters'
import { IMarketsCoinData } from '@/types'
import { useTranslation } from 'react-i18next'

interface IProps {
  cryptoMarketCoinData: IMarketsCoinData
  className?: string
}

export const DetailsCoinsData: React.FC<IProps> = ({ cryptoMarketCoinData, className }) => {
  const { t } = useTranslation()

  return (
    <div className={'flex flex-col items-center justify-center w-full mt-4'}>
      <h3 className={'text-sm mb-0.5'}>{t('crypto_details_popup.coins_data')}</h3>

      <div
        className={'bg-accent w-full rounded-xl px-6 py-3.5 text-sm font-medium text-foreground text-nowrap'}
      >

        <div className={'flex justify-between mb-1 pb-1 border-b border-border/30'}>
          <p>{t('crypto_details_popup.coin_data_table.market_cap')}</p>
          <p>
            {formatPrice(cryptoMarketCoinData?.market_cap)} $
          </p>
        </div>
        <div className={'flex justify-between mb-1 pb-1 border-b border-border/30'}>
          <p>{t('crypto_details_popup.coin_data_table.fdv')}</p>
          <p>
            {formatPrice(cryptoMarketCoinData?.fdv)} $
          </p>
        </div>
        <div className={'flex justify-between mb-1 pb-1 border-b border-border/30'}>
          <p>{t('crypto_details_popup.coin_data_table.volume_24h')}</p>
          <p>
            {formatPrice(cryptoMarketCoinData?.volume_24h)} $
          </p>
        </div>
        <div className={'flex justify-between mb-1 pb-1 border-b border-border/30'}>
          <p>{t('crypto_details_popup.coin_data_table.circulation_supply')}</p>
          <p>
            {formatPrice(Number(cryptoMarketCoinData?.circulating_supply.toFixed()))}
          </p>
        </div>
        <div className={'flex justify-between mb-1 pb-1 border-b border-border/30'}>
          <p>{t('crypto_details_popup.coin_data_table.total_supply')}</p>
          <p>
            {formatPrice(Number(cryptoMarketCoinData?.total_supply.toFixed()))}
          </p>
        </div>
        <div className={'flex justify-between'}>
          <p>{t('crypto_details_popup.coin_data_table.ath')}</p>
          <p>
            {formatPrice(cryptoMarketCoinData?.all_time_high)} $
          </p>
        </div>
      </div>
    </div>
  )
}
