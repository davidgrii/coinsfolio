'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card'
import { cn } from '@/shared/ui/utils'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Carousel, CarouselContent, CarouselItem } from '@/shared/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import { useGlobalData } from '@/features/global-data/model/use-global-data'

interface IProps {
  className?: string
}

export const GlobalDashboard: React.FC<IProps> = ({ className }) => {
  const { globalData, isLoading } = useGlobalData()
  const showEmpty = !isLoading && !globalData

  const { t } = useTranslation()

  const totalMarketCapUSD = Math.floor(globalData?.total_market_cap?.usd || 0)
  const totalVolume24hUSD = Math.floor(globalData?.total_volume?.usd || 0)
  const marketCapChange24h = globalData?.market_cap_change_percentage_24h_usd || null
  const marketCapPercentageBTC = globalData?.market_cap_percentage?.btc || 0

  const getMarketCapChangeClass = () => {
    if (marketCapChange24h === null) return 'text-muted'
    return marketCapChange24h < 0 ? 'text-secondary' : 'text-primary'
  }

  const formatNumberWithCommas = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  return (
    <Carousel plugins={[
      Autoplay({
        delay: 8000,
      }),
    ]} opts={{
      loop: true
    }}>
      <CarouselContent className={'select-none'}>
        <CarouselItem>
          <Card
            className={cn('flex py-4 pl-6 pr-9 items-center cursor-pointer relative justify-between rounded-xl border-0', className)}>
            <CardHeader className={'p-0 space-y-0.5'}>
              <CardTitle className={'text-xs text-muted-foreground'}>
                {t('dashboard.market_cap')}
              </CardTitle>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.1 }}
              >
                <CardDescription className={'text-sm text-foreground font-bold'}>
                  {formatNumberWithCommas(totalMarketCapUSD)} $
                </CardDescription>
              </motion.div>
            </CardHeader>

            <CardContent className={'p-0'}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.1 }}
              >
                <p className={cn(getMarketCapChangeClass(), 'text-sm font-semibold transition-colors')}>
                  {showEmpty ? 'N/A' : marketCapChange24h !== null && marketCapChange24h.toFixed(2) + ' %'}
                </p>
              </motion.div>
            </CardContent>

            <div className={'flex gap-2 absolute bottom-1.5 left-1/2 -translate-x-1/2'}>
              <span className={'w-1.5 h-1.5 rounded-full bg-[#D9D9D9]'}></span>
              <span className={'w-1.5 h-1.5 rounded-full border-[#D9D9D9]/65 border'}></span>
            </div>
          </Card>
        </CarouselItem>

        <CarouselItem>
          <Card
            className={cn('flex py-4 pl-6 pr-9 relative h-[70px] items-center cursor-pointer justify-between rounded-xl border-0', className)}>
            <CardHeader className={'p-0 space-y-0.5'}>
              <CardTitle className={'text-xs text-muted-foreground'}>
                {t('dashboard.trending')}
              </CardTitle>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.1 }}
              >
                <CardDescription className={'text-sm text-foreground font-bold'}>
                  {formatNumberWithCommas(totalVolume24hUSD)} $
                </CardDescription>
              </motion.div>
            </CardHeader>

            <CardContent className={'p-0'}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.1 }}
                className={'text-right leading-none space-y-0.5'}
              >
                <span className={'flex justify-end font-semibold tracking-tight text-xs text-muted-foreground h-4'}>
                  {t('dashboard.dominance')}
                </span>

                <p className={'text-sm text-foreground font-semibold'}>
                  BTC {marketCapPercentageBTC.toFixed(2)} %
                </p>
              </motion.div>
            </CardContent>

            <div className={'flex gap-2 absolute bottom-1.5 left-1/2 -translate-x-1/2'}>
              <span className={'w-1.5 h-1.5 rounded-full border-[#D9D9D9]/65 border'}></span>
              <span className={'w-1.5 h-1.5 rounded-full bg-[#D9D9D9]'}></span>
            </div>
          </Card>

        </CarouselItem>
      </CarouselContent>
    </Carousel>
  )
}
