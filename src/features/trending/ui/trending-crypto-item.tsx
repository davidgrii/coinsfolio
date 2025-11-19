import React from 'react'
import { CardContent } from '@/shared/ui/card'
import { Icons } from '@/shared/icons'
import Image from 'next/image'
import { formatPrice, getDynamicFontSize } from '@/shared/utils/formatters'
import { useCryptoModalStore } from '@/shared/store/crypto/crypto-modal.store'
import { CryptoItemDetails } from '@/features/crypto-details/ui/crypto-item-details'
import { ITrendingCrypto } from '@/types'

interface IProps {
  userId: string
  favorites: string[]
  index: number
  crypto: ITrendingCrypto
  addFavorite: ({ userId, cryptoId }: { userId: string, cryptoId: string }) => Promise<void>
  removeFavorite: ({ userId, cryptoId }: { userId: string, cryptoId: string }) => Promise<void>
  className?: string
}

export const TrendingCryptoItem: React.FC<IProps> = (
  {
    userId,
    index,
    crypto,
    favorites,
    addFavorite,
    removeFavorite
  }) => {

  const isFavorite = favorites.includes(crypto.id)
  const priceChange = crypto.price_change_percentage_24h_usd ?? 0
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

  return (
    <>
      <CardContent
        className={'p-0 flex justify-between items-center cursor-pointer'}
        onClick={() => openModal(crypto, crypto.market_cap_rank)}
      >
        <div className="flex items-center gap-2.5">
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
            className={`${getDynamicFontSize(crypto.price.toString().length)} text-foreground font-bold whitespace-nowrap`}>
            {formatPrice(crypto.price)} $
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
            {isFavorite ? <Icons.StarFavorite className={'w-4 h-4'}/> : <Icons.Star className={'w-4 h-4'}/>}
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
          index={crypto.market_cap_rank}
        />
      }
    </>
  )
}
