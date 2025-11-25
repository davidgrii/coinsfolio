import { CardContent } from '@/components/ui/card';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { IPortfolio } from '@/types';
import { formatPrice, formatPriceWithoutDecimals } from '@/lib/utils';
import { PortfolioEdit } from '@/components/portfolio/portfolio-item-edit';
import { PortfolioConfirm } from '@/components/portfolio/portfolio-item-confirm';
import { PortfolioDetails } from '@/components/portfolio/portfolio-item-details';
import { Avatar, Snackbar } from '@telegram-apps/telegram-ui';
import { useTranslation } from 'react-i18next';

interface IProps {
  item: IPortfolio;
  onEdit: (_id: string) => void;
  onDelete: (id: string) => void;
}

export const PortfolioItem: React.FC<IProps> = ({ item, onEdit, onDelete }) => {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);

  if (!item || !item.crypto) {
    return null;
  }

  const currentPrice = item?.crypto.current_price;
  const quantity = item.quantity;
  const purchasePrice = item.purchasePrice;

  const investedUSD = quantity * purchasePrice;
  const currentInvestmentValue = currentPrice * quantity;
  const profitLossUSD = currentInvestmentValue - investedUSD;
  const profitLossPercentage =
    ((currentPrice - purchasePrice) / purchasePrice) * 100;

  const handleClickDelete = (cryptoId: string) => {
    const result = confirm(t('my_portfolio_page.are_agree'));

    if (result) {
      onDelete(cryptoId);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <AccordionItem value={item.cryptoId}>
        <AccordionTrigger className=''>
          <CardContent
            className={'p-0 flex w-full justify-between select-none'}
          >
            <div className={'flex items-center gap-2'}>
              <div className='rounded-full overflow-hidden'>
                <Avatar
                  size={40}
                  src={item.crypto.image}
                  alt={item.crypto.name}
                  className='!bg-transparent'
                />
              </div>

              <div className='grid gap-0.5 text-left'>
                <p className='text-sm leading-none'>
                  {item.crypto.symbol?.toUpperCase()}
                </p>
                <p className='text-[8.5px] font-semibold text-neutral-03 truncate'>
                  {item.crypto?.name}
                </p>
              </div>
            </div>

            <div className={'flex items-center'}>
              <div className={'mr-4'}>
                <p
                  className={`text-sm text-foreground font-semibold  whitespace-nowrap`}
                >
                  {formatPrice(currentPrice)} $
                </p>
                <p
                  className={`${
                    item.crypto.price_change_percentage_24h
                      .toString()
                      .includes('-')
                      ? 'text-specials-danger'
                      : 'text-specials-success'
                  }  text-[8.7px] text-right font-semibold`}
                >
                  {item.crypto.price_change_percentage_24h.toFixed(2)} %
                </p>
              </div>

              <div className={'w-24 mr-6'}>
                <p
                  className={`${
                    item.crypto.current_price.toString().length > 8
                      ? 'text-[13px]'
                      : 'text-sm'
                  } text-foreground font-bold text-right  whitespace-nowrap`}
                >
                  {formatPriceWithoutDecimals(
                    item.crypto.current_price * item.quantity,
                  )}{' '}
                  $
                </p>
                <p
                  className={
                    'text-neutral-03 text-[8.7px] text-right font-semibold'
                  }
                >
                  {formatPrice(quantity)} {item.crypto.symbol.toUpperCase()}
                </p>
              </div>
            </div>
          </CardContent>
        </AccordionTrigger>

        <AccordionContent className={'flex gap-2.5 pl-0.5 items-start'}>
          <PortfolioEdit
            open={open}
            onDelete={handleClickDelete}
            setOpen={setOpen}
            onEdit={onEdit}
            itemId={item.cryptoId}
          />

          <PortfolioDetails
            notice={item.notice}
            investedUSD={investedUSD}
            purchasePrice={purchasePrice}
            profitLossUSD={profitLossUSD}
            profitLossPercentage={profitLossPercentage}
          />
        </AccordionContent>
      </AccordionItem>
    </motion.div>
  );
};
