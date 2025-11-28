'use client';

import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { cn } from '@/components/ui/utils';
import { usePortfolioStore } from '@/store';
import { useTranslation } from 'react-i18next';
import {
  formatPrice,
  formattedBalance,
  getClassedBasedOnValue,
  getClassesBalance,
} from '@/lib/utils';
import { motion } from 'framer-motion';
import Autoplay from 'embla-carousel-autoplay';
import { useTelegramUser } from '@/hooks/use-telegram-user';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { usePortfolio } from '@/hooks/queries/use-portfolio';
import { Skeleton } from '@/components/ui/skeleton';
import { Divider } from '@telegram-apps/telegram-ui';

function PortfolioDashboardSkeleton() {
  return (
    <Skeleton className={'animate-pulse h-[80px] w-full rounded-xl mb-2'} />
  );
}

export const PortfolioDashboard = () => {
  const { data } = useTelegramUser();
  const userId = data?.userId || '';

  const { data: portfolio, isLoading: isPortfolioLoading } =
    usePortfolio(userId);

  const {
    setPortfolio,
    totalBalance,
    totalProfitLoss,
    totalProfitLossPercentage,
    totalPercentageChange24h,
    totalPriceChange24h,
    totalInvestedUSD,
    calculateTotalInvestedUSD,
  } = usePortfolioStore();

  const { t } = useTranslation();

  const carouselRef = useRef(
    Autoplay({ delay: 9000, stopOnInteraction: true }),
  );

  const balance = formattedBalance(Number(totalBalance.toFixed(2)));

  useEffect(() => {
    if (portfolio) {
      setPortfolio(portfolio);
      calculateTotalInvestedUSD();
    }
  }, [calculateTotalInvestedUSD, portfolio, setPortfolio]);

  if (!portfolio || isPortfolioLoading) return <PortfolioDashboardSkeleton />;

  return (
    <div className='relative'>
      {portfolio.length > 0 ? (
        <Carousel plugins={[carouselRef.current]} opts={{ loop: true }}>
          <CarouselContent className={'select-none'}>
            <CarouselItem>
              <Card
                className={
                  'bg-neutral-04 py-4 pl-6 pr-9 items-center justify-between rounded-xl border-0 cursor-pointer relative'
                }
              >
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
                        className={cn(
                          getClassesBalance(totalBalance, totalInvestedUSD),
                          'text-sm font-semibold transition-colors',
                        )}
                      >
                        {balance} $
                      </p>
                    </motion.div>
                  </div>

                  <Divider />

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
              </Card>
            </CarouselItem>

            <CarouselItem>
              <Card
                className={
                  'bg-neutral-04 py-4 pl-6 pr-9 items-center justify-between rounded-xl border-0 cursor-pointer relative'
                }
              >
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
                        className={cn(
                          getClassedBasedOnValue(totalPriceChange24h),
                          'text-sm font-semibold transition-colors',
                        )}
                      >
                        {formatPrice(Number(totalPriceChange24h.toFixed(2)))} $
                      </p>

                      <p
                        className={cn(
                          getClassedBasedOnValue(totalPercentageChange24h),
                          'text-sm font-semibold w-20 text-right transition-colors',
                        )}
                      >
                        {totalPercentageChange24h !== null
                          ? totalPercentageChange24h.toFixed(2)
                          : 'N/A'}{' '}
                        %
                      </p>
                    </motion.div>
                  </div>

                  <Divider />

                  <div className={'flex justify-between items-end'}>
                    <p
                      className={
                        'text-sm text-foreground font-semibold text-nowrap'
                      }
                    >
                      {t('dashboard_balance.over_time')}
                    </p>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1.1 }}
                      className={'flex gap-1.5'}
                    >
                      <p
                        className={cn(
                          getClassedBasedOnValue(totalProfitLoss),
                          'text-sm font-semibold transition-colors',
                        )}
                      >
                        {formatPrice(Number(totalProfitLoss.toFixed(2)))} $
                      </p>
                      <p
                        className={cn(
                          getClassedBasedOnValue(totalProfitLossPercentage),
                          'text-sm font-semibold w-20 text-right transition-colors',
                        )}
                      >
                        {totalProfitLossPercentage !== null
                          ? totalProfitLossPercentage.toFixed(2)
                          : 'N/A'}{' '}
                        %
                      </p>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      ) : (
        <Card
          className={
            'bg-neutral-04 py-4 pl-6 pr-9 items-center justify-between rounded-xl border-0'
          }
        >
          <CardHeader
            className={
              'flex flex-row items-center justify-between p-0 space-y-0 mb-3.5'
            }
          >
            <CardTitle className={'text-sm text-muted-foreground font-bold'}>
              {t('dashboard_balance.my_balance')}
            </CardTitle>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.1 }}
            >
              <CardDescription
                className={'text-sm text-foreground font-bold mr-[85px]'}
              >
                122,467 $
              </CardDescription>
            </motion.div>
          </CardHeader>

          <CardContent className={'flex flex-col gap-1 p-0'}>
            <div className={'flex justify-between items-end'}>
              <p className={'text-xs w-24 text-neutral-03 font-medium'}>
                {t('dashboard_balance.24h')}
              </p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.1 }}
                className={'flex gap-1.5'}
              >
                <p
                  className={
                    'text-sm text-specials-danger font-semibold transition-colors'
                  }
                >
                  -3,323 $
                </p>
                <p
                  className={
                    'text-sm font-semibold w-20 text-right transition-colors text-specials-danger'
                  }
                >
                  -0.92 %
                </p>
              </motion.div>
            </div>

            <Divider />

            <div className={'flex justify-between items-end'}>
              <p
                className={
                  'text-xs w-24 text-neutral-03 font-medium text-nowrap'
                }
              >
                {t('dashboard_balance.over_time')}
              </p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.1 }}
                className={'flex gap-1.5'}
              >
                <p
                  className={
                    'text-sm font-semibold transition-colors text-specials-success'
                  }
                >
                  76,572 $
                </p>
                <p
                  className={
                    'text-sm text-specials-success font-semibold w-20 text-right transition-colors'
                  }
                >
                  87 %
                </p>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      )}

      {portfolio.length > 0 && (
        <div
          className={
            'flex gap-2 absolute bottom-1.5 left-1/2 -translate-x-1/2'
          }
        >
                  <span
                    className={'w-1.5 h-1.5 rounded-full bg-[#D9D9D9]'}
                  ></span>
          <span
            className={
              'w-1.5 h-1.5 rounded-full border-[#D9D9D9]/65 border'
            }
          ></span>
        </div>
      )}
    </div>
  );
};
