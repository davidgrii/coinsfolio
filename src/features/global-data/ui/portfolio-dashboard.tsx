'use client'

import React, { useEffect } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Carousel,
  CarouselContent,
  CarouselItem,
  Separator
} from '@/shared/ui'
import { cn } from '@/shared/ui/utils'
import { usePortfolioStore } from '@/shared/store'
import { useTranslation } from 'react-i18next'
import { formatPrice } from '@/shared/utils/formatters'
import { motion } from 'framer-motion'
import Autoplay from 'embla-carousel-autoplay'
import { usePortfolio } from '@/features/portfolio'
import { useTelegramUser } from '@/hooks/use-telegram-user'

export const PortfolioDashboard = () => {
  const { data } = useTelegramUser()
  const userId = data?.userId || ''

  const { portfolioData: portfolio } = usePortfolio(userId)

  const {
    setPortfolio,
    totalBalance,
    totalProfitLoss,
    totalProfitLossPercentage,
    totalPercentageChange24h,
    totalPriceChange24h,
    totalInvestedUSD,
    calculateTotalInvestedUSD
  } = usePortfolioStore()

  const { t } = useTranslation()

  const getClassedBasedOnValue = (value: number) => {
    if (value === 0) return 'text-muted'
    return value < 0 ? 'text-secondary' : 'text-primary'
  }

  const getClassesBalance = () => {
    if (totalBalance > totalInvestedUSD) {
      return 'text-primary'
    } else {
      return 'text-secondary'
    }
  }

  const formattedBalance = totalBalance.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })

  useEffect(() => {
      if (portfolio.length > 0) {
        setPortfolio(portfolio)
      }

      if (portfolio.length > 0) {
        calculateTotalInvestedUSD()
      }
    },
    [calculateTotalInvestedUSD, portfolio, setPortfolio]
  )

  console.log('render')

  return (
    <>
      {portfolio.length > 0 ?
        <Carousel plugins={[
          Autoplay({
            delay: 8000
          })
        ]} opts={{
          loop: true
        }}>
          <CarouselContent className={'select-none'}>
            <CarouselItem>
              <Card
                className={'py-5 pl-6 pr-9 items-center justify-between rounded-xl border-0 cursor-pointer relative'}>
                <CardContent className={'flex flex-col gap-1 p-0'}>
                  <div className={'flex justify-between items-end'}>
                    <p className={'text-sm text-foreground font-semibold'}>
                      {t('dashboard_balance.my_balance')}
                    </p>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1.1 }}
                      className={'flex gap-1.5'}
                    >
                      <p
                        className={cn(getClassesBalance(), 'text-sm font-semibold transition-colors')}>
                        {formattedBalance} $
                      </p>
                    </motion.div>
                  </div>

                  <Separator className={'opacity-30'} />

                  <div className={'flex justify-between items-end'}>
                    <p className={'text-sm text-foreground font-semibold'}>
                      {t('dashboard_balance.invested')}
                    </p>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1.1 }}
                      className={'flex gap-1.5'}
                    >
                      <p className={'text-sm font-semibold transition-colors'}>
                        {formatPrice(Number(totalInvestedUSD.toFixed(2)))} $
                      </p>
                    </motion.div>

                  </div>
                </CardContent>

                <div className={'flex gap-2 absolute bottom-1.5 left-1/2 -translate-x-1/2'}>
                  <span className={'w-1.5 h-1.5 rounded-full bg-[#D9D9D9]'}></span>
                  <span className={'w-1.5 h-1.5 rounded-full border-[#D9D9D9]/65 border'}></span>
                </div>
              </Card>
            </CarouselItem>

            <CarouselItem>
              <Card
                className={'py-5 pl-6 pr-9 items-center justify-between rounded-xl border-0 cursor-pointer relative'}>
                <CardContent className={'flex flex-col gap-1 p-0'}>
                  <div className={'flex justify-between items-end'}>
                    <p className={'text-sm text-foreground font-semibold'}>
                      {t('dashboard_balance.24h')}
                    </p>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1.1 }}
                      className={'flex gap-1.5'}
                    >
                      <p
                        className={cn(getClassedBasedOnValue(totalPriceChange24h), 'text-sm font-semibold transition-colors')}>
                        {formatPrice(Number(totalPriceChange24h.toFixed(2)))} $
                      </p>

                      <p
                        className={cn(getClassedBasedOnValue(totalPercentageChange24h), 'text-sm font-semibold w-20 text-right transition-colors')}>
                        {totalPercentageChange24h !== null ? totalPercentageChange24h.toFixed(2) : 'N/A'} %
                      </p>
                    </motion.div>
                  </div>

                  <Separator className={'opacity-30'} />

                  <div className={'flex justify-between items-end'}>
                    <p className={'text-sm text-foreground font-semibold text-nowrap'}>
                      {t('dashboard_balance.over_time')}
                    </p>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1.1 }}
                      className={'flex gap-1.5'}
                    >
                      <p className={cn(getClassedBasedOnValue(totalProfitLoss),
                        'text-sm font-semibold transition-colors')}
                      >
                        {formatPrice(Number(totalProfitLoss.toFixed(2)))} $
                      </p>
                      <p
                        className={cn(getClassedBasedOnValue(totalProfitLossPercentage),
                          'text-sm font-semibold w-20 text-right transition-colors')}
                      >
                        {totalProfitLossPercentage !== null ? totalProfitLossPercentage.toFixed(2) : 'N/A'} %
                      </p>
                    </motion.div>

                  </div>
                </CardContent>

                <div className={'flex gap-2 absolute bottom-1.5 left-1/2 -translate-x-1/2'}>
                  <span className={'w-1.5 h-1.5 rounded-full border-[#D9D9D9]/65 border'}></span>
                  <span className={'w-1.5 h-1.5 rounded-full bg-[#D9D9D9]'}></span>
                </div>
              </Card>
            </CarouselItem>
          </CarouselContent>
        </Carousel>

        : <Card className={'py-4 pl-6 pr-9 items-center justify-between rounded-xl border-0'}>
          <CardHeader className={'flex flex-row items-center justify-between p-0 space-y-0 mb-3.5'}>
            <CardTitle className={'text-sm text-muted-foreground font-bold'}>
              {t('dashboard_balance.my_balance')}
            </CardTitle>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.1 }}
            >
              <CardDescription className={'text-sm text-foreground font-bold mr-[85px]'}>
                122,467 $
              </CardDescription>
            </motion.div>
          </CardHeader>

          <CardContent className={'flex flex-col gap-1 p-0'}>
            <div className={'flex justify-between items-end'}>
              <p className={'text-xs w-24 text-muted-foreground font-medium'}>
                {t('dashboard_balance.24h')}
              </p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.1 }}
                className={'flex gap-1.5'}
              >
                <p className={'text-sm text-secondary font-semibold transition-colors'}>
                  -3,323 $
                </p>
                <p
                  className={'text-sm font-semibold w-20 text-right transition-colors text-secondary'}>
                  -0.92 %
                </p>
              </motion.div>
            </div>

            <Separator className={'opacity-30'} />

            <div className={'flex justify-between items-end'}>
              <p className={'text-xs w-24 text-muted-foreground font-medium text-nowrap'}>
                {t('dashboard_balance.over_time')}
              </p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.1 }}
                className={'flex gap-1.5'}
              >
                <p className={'text-sm font-semibold transition-colors text-primary'}>
                  76,572 $
                </p>
                <p className={'text-sm text-primary font-semibold w-20 text-right transition-colors'}>
                  87 %
                </p>
              </motion.div>

            </div>
          </CardContent>
        </Card>
      }
    </>
  )
}