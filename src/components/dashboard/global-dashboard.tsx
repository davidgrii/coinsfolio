'use client';

import React, { useRef } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/components/ui/utils';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { useGlobalData } from '@/hooks/queries/use-global-data';
import { formatPriceWithCommas, getMarketCapChangeClass } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

function GlobalDashboardSkeleton() {
  return (
    <Skeleton className={'animate-pulse h-[70px] w-full rounded-xl'} />
  );
}

export const GlobalDashboard = () => {
  const { data: globalData, isLoading: isGlobalDataLoading } = useGlobalData();
  const { t } = useTranslation();

  const carouselRef = useRef(
    Autoplay({ delay: 9000, stopOnInteraction: true }),
  );

  const totalMarketCapUSD = Math.floor(globalData?.total_market_cap?.usd || 0);
  const totalVolume24hUSD = Math.floor(globalData?.total_volume?.usd || 0);
  const marketCapChange24h = globalData?.market_cap_change_percentage_24h_usd || 0;
  const marketCapPercentageBTC = globalData?.market_cap_percentage?.btc || 0;

  if (!globalData || isGlobalDataLoading) return <GlobalDashboardSkeleton />;

  return (
    <div className='relative'>
      <Carousel plugins={[carouselRef.current]} opts={{ loop: true }}>
        <CarouselContent className={'select-none'}>
          <CarouselItem>
            <Card className='bg-neutral-04 flex py-4 pl-6 pr-9 items-center cursor-pointer relative justify-between rounded-xl border-0'>
              <CardHeader className={'p-0 space-y-0.5'}>
                <CardTitle className={'text-xs text-neutral-03'}>
                  {t('dashboard.market_cap')}
                </CardTitle>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.1 }}
                >
                  <CardDescription
                    className={'text-sm text-foreground font-bold'}
                  >
                    {formatPriceWithCommas(totalMarketCapUSD)} $
                  </CardDescription>
                </motion.div>
              </CardHeader>

              <CardContent className={'p-0'}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.1 }}
                >
                  <p
                    className={cn(
                      getMarketCapChangeClass(marketCapChange24h),
                      'text-sm font-semibold transition-colors',
                    )}
                  >
                    {marketCapChange24h?.toFixed(2) + ' %'}
                  </p>
                </motion.div>
              </CardContent>
            </Card>
          </CarouselItem>

          <CarouselItem>
            <Card className='bg-neutral-04 flex py-4 pl-6 pr-9 relative h-[70px] items-center cursor-pointer justify-between rounded-xl border-0'>
              <CardHeader className={'p-0 space-y-0.5'}>
                <CardTitle className={'text-xs text-neutral-03'}>
                  {t('dashboard.trending')}
                </CardTitle>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.1 }}
                >
                  <CardDescription
                    className={'text-sm text-base-foreground font-bold'}
                  >
                    {formatPriceWithCommas(totalVolume24hUSD)} $
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
                <span
                  className={
                    'flex justify-end font-semibold tracking-tight text-xs text-neutral-03 h-4'
                  }
                >
                  {t('dashboard.dominance')}
                </span>

                  <p className={'text-sm text-foreground font-semibold'}>
                    BTC {marketCapPercentageBTC.toFixed(2)} %
                  </p>
                </motion.div>
              </CardContent>
            </Card>
          </CarouselItem>
        </CarouselContent>
      </Carousel>

      <div
        className={
          'flex gap-2 absolute bottom-1.5 left-1/2 -translate-x-1/2'
        }
      >
        <span className={'w-1.5 h-1.5 rounded-full bg-[#D9D9D9]'}></span>
        <span
          className={
            'w-1.5 h-1.5 rounded-full border-[#D9D9D9]/65 border'
          }
        ></span>
      </div>
    </div>
  );
};
