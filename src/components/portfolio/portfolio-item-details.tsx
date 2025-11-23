import React from 'react'
import { cn } from '@/components/ui/utils'
import { useTranslation } from 'react-i18next'
import { Icons } from '@/components/icons'
import { formatPrice } from '@/lib/utils'
import { Divider } from '@telegram-apps/telegram-ui'

interface IProps {
  notice?: string
  purchasePrice: number
  investedUSD: number
  profitLossUSD: number
  profitLossPercentage: number
}

export const PortfolioDetails: React.FC<IProps> = ({notice, purchasePrice, investedUSD, profitLossUSD, profitLossPercentage }) => {

  const { t } = useTranslation()

  return (
    <div className={'flex flex-col gap-0.5 w-full text-sm font-medium text-muted-foreground mr-9 select-none'}>
      <div className={'flex justify-between'}>
        <p>{t('my_portfolio_page.purchase')}</p>
        <p className={'text-foreground font-bold'}>
          {formatPrice(purchasePrice)} $
        </p>
      </div>

      <Divider />

      <div className={'flex justify-between'}>
        <p>{t('my_portfolio_page.invested')}</p>
        <p className={'text-foreground font-bold'}>
          {formatPrice(investedUSD)} $
        </p>
      </div>

      <Divider />

      <div className={'flex justify-between'}>
        <p>{t('my_portfolio_page.over_entry')} $</p>
        <p className={cn(profitLossUSD > 0 ? 'text-specials-success' : 'text-specials-danger', 'font-bold')}>
          {formatPrice(profitLossUSD)} $
        </p>
      </div>

      <Divider />

      <div className={'flex justify-between'}>
        <p>{t('my_portfolio_page.over_entry')} %</p>
        <p className={cn(profitLossPercentage > 0 ? 'text-specials-success' : 'text-specials-danger', 'font-bold')}>
          {formatPrice(Number(profitLossPercentage.toFixed(2)))} %
        </p>
      </div>

      {notice &&
        <span className={'-ml-11 flex items-center gap-5 text-foreground border-[#282828] border font-medium rounded-sm mt-1 p-1 pl-2.5 pr-4 text-[12px]'}>
          <Icons.notice /> {notice}
        </span>
      }
    </div>
  )
}
