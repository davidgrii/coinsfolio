import React from 'react';
import { motion } from 'framer-motion';
import { CirclePlus } from 'lucide-react';
import { Icons } from '@/components/icons';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { formatPrice, formatPriceWithoutDecimals } from '@/lib/utils';
import { PortfolioDetails } from '@/components/portfolio/portfolio-item-details';
import { Avatar } from '@telegram-apps/telegram-ui';

interface IProps {
  onAddCrypto: (open: boolean) => void;
}

const {
  id,
  name,
  symbol,
  image,
  current_price,
  quantity,
  price_change_percentage_24h,
  total_value,
  purchase_price,
  profitLossUSD,
  profitLossPercentage,
  notice,
} = {
  id: 'bitcoin',
  name: 'Bitcoin',
  symbol: 'BTC',
  image: '/bitcoin.png',
  current_price: 58203,
  quantity: 1.5,
  price_change_percentage_24h: 2.3,
  total_value: 54772,
  purchase_price: 36515,
  profitLossUSD: 32532,
  profitLossPercentage: 59.39,
  notice: 'Bought during the dip',
};

export const PortfolioExample: React.FC<IProps> = ({
                                                     onAddCrypto,
}) => {
  const { t } = useTranslation();

  return (
    <div
      className={'w-full flex flex-col justify-center'}
    >
      <div className={'fixed inset-0 bg-black/10 backdrop-blur-[1px] z-20 select-none'} />

      <Accordion value={id} className={'w-full'} type={'single'}>
        <AccordionItem value={id}>
          <AccordionTrigger>
            <CardContent className={'p-0 flex w-full justify-between'}>
              <div className={'flex items-center gap-2'}>
                <div className='rounded-full overflow-hidden'>
                  <Avatar
                    size={40}
                    src={image}
                    alt={name}
                    className='!bg-transparent'
                  />
                </div>

                <div className='grid gap-0.5 text-left'>
                  <p className='text-sm leading-none'>{symbol}</p>
                  <p className='text-[8.5px] font-semibold text-neutral-03 truncate'>
                    {name}
                  </p>
                </div>
              </div>

              <div className={'flex items-center'}>
                <div className={'mr-4'}>
                  <p
                    className={`text-sm text-foreground font-semibold  whitespace-nowrap`}
                  >
                    {formatPrice(current_price)} $
                  </p>
                  <p
                    className={`${
                      price_change_percentage_24h.toString().includes('-')
                        ? 'text-specials-danger'
                        : 'text-specials-success'
                    }  text-[8.7px] text-right font-semibold`}
                  >
                    {price_change_percentage_24h.toFixed(2)} %
                  </p>
                </div>

                <div className={'w-24 mr-6'}>
                  <p
                    className={`${
                      current_price.toString().length > 8
                        ? 'text-[13px]'
                        : 'text-sm'
                    } text-foreground font-bold text-right  whitespace-nowrap`}
                  >
                    {formatPriceWithoutDecimals(current_price * quantity)} $
                  </p>
                  <p
                    className={
                      'text-neutral-03 text-[8.7px] text-right font-semibold'
                    }
                  >
                    {formatPrice(quantity)} {symbol.toUpperCase()}
                  </p>
                </div>
              </div>
            </CardContent>
          </AccordionTrigger>

          <AccordionContent className={'flex gap-[13px] pl-0.5 items-start'}>
            <span className={'ml-1 flex justify-center'}>
              <Icons.edit />
            </span>

            <PortfolioDetails
              notice={notice}
              investedUSD={total_value}
              purchasePrice={purchase_price}
              profitLossUSD={profitLossUSD}
              profitLossPercentage={profitLossPercentage}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className={'relative mt-4 m-auto z-50'}>
        <div className={'flex items-center justify-center relative mb-6'}>
          <button
            onClick={() => onAddCrypto(true)}
            className={'animate-pulse'}
          >
            <CirclePlus
              className={
                'w-10 h-10 cursor-pointer text-foreground transition-colors hover:text-muted-foreground'
              }
            />
          </button>

          <span className={'absolute animate-pulse top-2 right-24'}>
            <Icons.arrowEmpty />
          </span>
        </div>

        <p className={'text-xs flex text-center mx-2 font-medium'}>
          {t('add_crypto.add_coin_desc')}
        </p>
      </div>
    </div>
  );
};
