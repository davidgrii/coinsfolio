'use client'

import React from 'react'
import Image from 'next/image'
import { AnimatePresence } from 'framer-motion'
import { ICrypto } from '@/types'
import { formatPrice, getDynamicFontSize } from '@/lib/utils/formatters'
import { useCryptoModalStore } from '@/store/crypto/crypto-modal.store'
import { CryptoItemDetails } from '@/features/crypto-details/ui/crypto-item-details'
import { CardContent } from '@/components/ui/card'
import { Icons } from './icons'

interface IProps {
  userId: string
  index: number
  crypto: ICrypto
  favorites: string[]
  addFavorite: ({ userId, cryptoId }: { userId: string, cryptoId: string }) => Promise<void>
  removeFavorite: ({ userId, cryptoId }: { userId: string, cryptoId: string }) => Promise<void>
  className?: string
}

export const CryptoItem: React.FC<IProps> = (
  {
    userId,
    crypto,
    index,
    favorites,
    addFavorite,
    removeFavorite
  }) => {

  const isFavorite = favorites.includes(crypto.id)
  const priceChange = crypto.price_change_percentage_24h ?? 0
  const isPricePositive = !priceChange.toString().includes('-')

  const { openModal, isOpen } = useCryptoModalStore()

  const handleFavoriteToggle = async (event: React.MouseEvent, cryptoId: string) => {
    event.stopPropagation()

    try {
      if (isFavorite) {
        await removeFavorite({ userId, cryptoId })
      } else {
        await addFavorite({ userId, cryptoId })
      }

    } catch (error) {
      console.error('Error toggling favorite:', error)
    }
  }

  if (!crypto.current_price) return null

  return (
    <AnimatePresence>
      <CardContent
        onClick={() => openModal(crypto, crypto.market_cap_rank)}
        className={'p-0 flex justify-between items-center cursor-pointer select-none'}>

        <div className="flex items-center gap-2">
          <span className="w-5 text-sm text-muted-foreground">{index + 1}</span>

          <div className='rounded-full overflow-hidden'>
            <Image
              width={36}
              height={36}
              className="h-9 w-9"
              src={crypto.image}
              alt={crypto.name}
            />
          </div>
          <div className="grid gap-0.5">
            <p className="text-sm leading-none">
              {crypto.symbol.toUpperCase()}
            </p>
            <p className="text-[8.5px] font-semibold text-muted-foreground truncate">
              {crypto.name.length > 10 ? `${crypto.name.slice(0, 14)}...` : crypto.name}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <p
            className={`${getDynamicFontSize(crypto.current_price.toString().length)} text-foreground font-bold whitespace-nowrap`}>
            {formatPrice(crypto.current_price)} $
          </p>

          <div
            className={`w-16 text-[13px] text-right ${isPricePositive ? 'text-primary' : 'text-secondary'}`}
          >
            <span className="font-semibold">{priceChange.toFixed(2)} %</span>
          </div>

          <button
            className="p-1 pb-[6px]"
            onClick={(e) => handleFavoriteToggle(e, crypto.id)}
          >
            {isFavorite ?
              <Icons.StarFavorite className={'w-4 h-4'} />
              :
              <Icons.Star className={'w-4 h-4'} />
            }
          </button>
        </div>
      </CardContent>

      {isOpen &&
        <CryptoItemDetails
          addFavorite={addFavorite}
          removeFavorite={removeFavorite}
          favorites={favorites}
          userId={userId}
          key={crypto.id}
          index={index}
        />
      }
    </AnimatePresence>
  )
}
