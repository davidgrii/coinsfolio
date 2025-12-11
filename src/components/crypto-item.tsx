'use client';

import React from 'react';
import { formatPriceWithDecimals, getDynamicFontSize } from '@/lib/utils';
import { useCryptoModalStore } from '@/store/crypto/crypto-modal.store';
import { CardContent } from '@/components/ui/card';
import { Icons } from './icons';
import { Avatar } from '@telegram-apps/telegram-ui';
import { motion } from 'framer-motion';
import type { ICrypto } from '@/types';

interface IProps {
  index: number;
  crypto: ICrypto;
  isTrendingCrypto?: boolean;
  favorites: string[];
  onToggleFavorite: (cryptoId: string) => void;
  className?: string;
}

export const CryptoItem: React.FC<IProps> = ({
  crypto,
  index,
  isTrendingCrypto = false,
  favorites,
  onToggleFavorite,
}) => {
  const isFavorite = favorites.includes(crypto.id);
  const priceChange = crypto.price_change_percentage_24h ?? 0;
  const isPricePositive = !priceChange.toString().includes('-');

  const { setIsOpen, setSelectedCrypto } = useCryptoModalStore();

  return (
    <>
      <CardContent
        onClick={() => {
          setIsOpen(true);
          setSelectedCrypto(crypto);
        }}
        className={
          'p-0 flex justify-between items-center cursor-pointer select-none'
        }
      >
        <div className='flex items-center gap-2'>
          <span className='w-5 text-xs text-neutral-03'>
            {index >= 1000 ? index.toString().slice(0, 1) + 'k+' : index + 1}
          </span>

          <div className='rounded-full overflow-hidden'>
            <Avatar
              size={40}
              src={crypto.image}
              alt={crypto.name}
              className='!bg-transparent'
            />
          </div>
          <div className='grid gap-0.5'>
            <p className='text-sm leading-none'>
              {crypto.symbol.length > 10
                ? `${crypto.symbol.slice(0, 8).toUpperCase()}...`
                : crypto.symbol.toUpperCase()}
            </p>
            <p className='text-[8.5px] font-semibold text-neutral-03 truncate'>
              {crypto.name.length > 10
                ? `${crypto.name.slice(0, 14)}...`
                : crypto.name}
            </p>
          </div>
        </div>

        <div className='flex items-center gap-4'>
          {isTrendingCrypto ? (
            <p
              className={`${getDynamicFontSize(crypto?.price.toString().length)} text-foreground font-bold whitespace-nowrap`}
            >
              {formatPriceWithDecimals(crypto.price)} $
            </p>
          ) : (
            <p
              className={`${getDynamicFontSize(crypto.current_price.toString().length)} text-foreground font-bold whitespace-nowrap`}
            >
              {formatPriceWithDecimals(crypto.current_price)} $
            </p>
          )}

          <div
            className={`w-16 text-[13px] text-right ${isPricePositive ? 'text-specials-success' : 'text-specials-danger'}`}
          >
            <span className='font-semibold'>{priceChange.toFixed(2)} %</span>
          </div>

          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            whileHover={{ scale: 1.2 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className='p-1 pb-[6px]'
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(crypto.id);
            }}
          >
            {isFavorite ? (
              <Icons.favorites className={'w-4 h-4 text-[#FFB364]'} />
            ) : (
              <Icons.favoritesOutline className={'w-4 h-4'} />
            )}
          </motion.button>
        </div>
      </CardContent>
    </>
  );
};
