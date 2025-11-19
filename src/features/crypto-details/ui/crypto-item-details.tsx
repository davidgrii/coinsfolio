'use client'

import { useCryptoModalStore } from '@/store/crypto/crypto-modal.store'
import React from 'react'
import Image from 'next/image'
import { DetailsCoinsData } from '@/features/crypto-details/ui/details-coins-data'
import { DetailsMarketsData } from '@/features/crypto-details/ui/details-markets-data'
import { formatPrice, getDynamicFontSize } from '@/lib/utils/formatters'
import { Icons } from '@/components/icons'
import { MoreCryptoInfo } from '@/features/crypto-details/ui/more-crypto-info'
import { CryptoModal } from '@/components/crypto-modal'
import { useCryptoById } from '@/features/crypto-details/model/use-crypto-by-id'

interface IProps {
  favorites: string[]
  userId: string
  index: number
  addFavorite: ({ userId, cryptoId }: { userId: string, cryptoId: string }) => Promise<void>
  removeFavorite: ({ userId, cryptoId }: { userId: string, cryptoId: string }) => Promise<void>
  className?: string
}

export const CryptoItemDetails: React.FC<IProps> = ({ userId, favorites, removeFavorite, addFavorite }) => {
  const { isOpen, closeModal, selectedCrypto } = useCryptoModalStore()
  const { selectedCryptoById, isLoading } = useCryptoById(selectedCrypto?.id || null)

  if (!isOpen || !selectedCrypto || !selectedCryptoById || !selectedCrypto.id) return null

  const cryptoPrice = selectedCrypto?.current_price || selectedCrypto?.price || 0
  const isFavorite = favorites.includes(selectedCrypto.id)
  const { markets_coin_data, markets } = selectedCryptoById

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
    <CryptoModal isOpen={isOpen} onClose={closeModal}>
      <div className="flex justify-between w-full bg-accent items-center gap-3 px-6 py-4 rounded-[10px]">
        <div className={'flex items-center gap-2'}>
          <Image
            width={36}
            height={36}
            className="h-9 w-9"
            src={selectedCrypto.image}
            alt={selectedCrypto.name}
          />

          <div className="flex flex-col items-start">
            <div className={'flex gap-1 h-4'}>
              <p className="text-[11px] font-semibold text-muted-foreground truncate">
                {selectedCrypto.name.length > 10 ? `${selectedCrypto.name.slice(0, 14)}...` : selectedCrypto.name}
              </p>
              <span
                className="w-5 text-[11px] text-muted-foreground font-medium">#{selectedCrypto.market_cap_rank}</span>
            </div>

            <p
              className={`${getDynamicFontSize(cryptoPrice)} text-foreground font-bold whitespace-nowrap`}>
              {formatPrice(cryptoPrice)} $
            </p>
          </div>
        </div>

        <div className={'flex gap-4 items-center'}>
          <MoreCryptoInfo cryptoId={selectedCrypto.id} />

          <button
            className="p-1"
            onClick={(e) => handleFavoriteToggle(e, selectedCrypto.id)}
          >
            {isFavorite ? (
              <Icons.StarFavoriteV2 className={'w-4 h-4'}  />
            ) : (
              <Icons.StarV2 className={'w-4 h-4'} />
            )}
          </button>
        </div>
      </div>

      {!isLoading ? markets_coin_data && (
        <React.Suspense fallback={<div>Loading Coin Data...</div>}>
          <DetailsCoinsData cryptoMarketCoinData={markets_coin_data} />
        </React.Suspense>
      ) : null}

      {!isLoading ? markets.length > 0 && (
        <React.Suspense fallback={<div>Loading Market Data...</div>}>
          <DetailsMarketsData cryptoMarketsData={markets} />
        </React.Suspense>
      ) : null}
    </CryptoModal>
  )
}
