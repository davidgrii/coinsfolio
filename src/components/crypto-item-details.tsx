'use client'

import { useCryptoModalStore } from '@/store/crypto/crypto-modal.store'
import React from 'react'
import Image from 'next/image'
import { DetailsCoinsData } from '@/components/details-coins-data'
import { DetailsMarketsData } from '@/components/details-markets-data'
import { formatPrice, getDynamicFontSize } from '@/lib/utils'
import { MoreCryptoInfo } from '@/components/portfolio/more-crypto-info'
import { Button, FixedLayout, IconButton, Modal } from '@telegram-apps/telegram-ui'
import {
  ModalHeader
} from '@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader'
import { useCrypto, useFavorites } from '@/hooks/queries/use-crypto'
import { Skeleton } from '@/components/ui/skeleton'
import { useAddFavorite, useDeleteFavorite } from '@/hooks/queries/use-favorite-mutation'
import { useTelegramUser } from '@/hooks/use-telegram-user'
import { motion } from 'framer-motion'
import { Icons } from '@/components/icons'
import { Icon20QuestionMark } from '@telegram-apps/telegram-ui/dist/icons/20/question_mark'

function CryptoItemModalSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center px-3">
      <Skeleton className={'animate-pulse h-[70px] w-full rounded-xl mb-8'} />

      <Skeleton className={'animate-pulse h-[200px] w-full rounded-xl mb-8'} />
      <Skeleton className={'animate-pulse h-[200px] w-full rounded-xl '} />
    </div>
  )
}

// TODO: delete selectedCrypto instead of Crypto

export const CryptoItemModal = () => {
  const { data } = useTelegramUser()
  const userId = data?.userId || ''

  const { isOpen, selectedCrypto, setIsOpen } = useCryptoModalStore()
  const { data: crypto, isLoading } = useCrypto(selectedCrypto?.id || '')
  const { data: favoriteCryptos, isLoading: isFavoriteLoading } = useFavorites()

  const { mutate: addFavorite } = useAddFavorite()
  const { mutate: deleteFavorite } = useDeleteFavorite()

  const cryptoPrice = selectedCrypto?.current_price || selectedCrypto?.price || 0
  const isFavorite = favoriteCryptos?.favorites.includes(selectedCrypto?.id || '')

  const handleFavoriteToggle = async (cryptoId: string) => {
    if (favoriteCryptos?.favorites.includes(cryptoId)) {
      deleteFavorite({ userId, cryptoId })
    } else {
      addFavorite({ userId, cryptoId })
    }
  }

  return (
    <>
      <Modal
        open={isOpen}
        onOpenChange={setIsOpen}
        header={<ModalHeader/>}
        className='min-h-[60vh]'
      >
        {!crypto || !selectedCrypto || isLoading ? (
          <CryptoItemModalSkeleton />
        ) : (
          <div className="px-3">
            <div
              className="flex justify-between w-full bg-neutral-04 items-center gap-3 px-6 py-4 rounded-xl select-none mb-10">
              <div className={'flex items-center gap-2'}>
                <Image
                  width={36}
                  height={36}
                  className="h-9 w-9"
                  src={selectedCrypto.image}
                  alt={selectedCrypto.name}
                />

                <div className="flex flex-col items-start">
                  <div className={'flex gap-1 h-4 text-neutral-03'}>
                    <p className="text-[11px] font-semibold truncate">
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

              <div className={'flex gap-3 items-center'}>
                <motion.button
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-1 pb-[6px]"
                  onClick={() => handleFavoriteToggle(selectedCrypto.id)}
                >
                  {isFavorite ?
                    <Icons.favorites className={'w-5 h-5 text-[#FFB364]'} />
                    :
                    <Icons.favoritesOutline className={'w-5 h-5'} />
                  }
                </motion.button>

                <IconButton
                  mode="bezeled"
                  size="s"
                >
                  <Icon20QuestionMark />
                </IconButton>
              </div>
            </div>

            <DetailsCoinsData cryptoMarketCoinData={crypto.markets_coin_data} />

            {crypto.markets.length ? (
              <DetailsMarketsData cryptoMarketsData={crypto.markets} />
            ) : null}

            <FixedLayout className="px-3 !pb-3">
              <Button size="l" stretched mode='filled'>
                See more details
              </Button>
            </FixedLayout>
          </div>
        )}
      </Modal>
    </>
  )
}
