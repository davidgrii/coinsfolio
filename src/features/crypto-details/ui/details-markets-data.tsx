'use client'

import React from 'react'
import { formatPrice } from '@/lib/utils/formatters'
import { useTranslation } from 'react-i18next'
import { ICoinGlobalMarketsData } from '@/types'


interface IProps {
  cryptoMarketsData: ICoinGlobalMarketsData[]
  className?: string
}

export const DetailsMarketsData: React.FC<IProps> = ({ cryptoMarketsData, className }) => {
  const { t } = useTranslation()

  return (
    <div className={'flex flex-col items-center justify-center w-full mt-4'}>
      <div className={'flex justify-between items-end w-full text-xs text-muted-foreground mb-0.5 font-medium px-6'}>
        <span>{t('crypto_details_popup.exchange')}</span>
        <h3 className={'text-sm text-foreground pl-2'}>
          {t('crypto_details_popup.markets')}
        </h3>
        <span>{t('crypto_details_popup.volume_24h')}</span>
      </div>

      <div
        className={'w-full rounded-xl px-5 py-3 pb-1.5 text-sm font-medium text-foreground border-[4px] border-chart'}
      >
        {cryptoMarketsData.map((item, index) => (
          <div
            key={index}
            className={`flex justify-between mb-1 pb-1 ${index !== cryptoMarketsData.length - 1 ? 'border-b border-border/30' : ''}`}
          >
            <p>{item.exchange}</p>
            <p>
              {formatPrice(item.volume_24h)} $
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
