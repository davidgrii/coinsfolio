'use client'

import { motion } from 'framer-motion'

import { Container } from '@/components/container'
import { Categories } from '@/components/categories'
import { CryptoTableHeader } from '@/components/crypto-table-header'
import { CryptoSkeletonList } from '@/components/crypto-skeleton-list'
import { useFavorites, useTrendingCryptos } from '@/hooks/queries/use-crypto'
import {
  useAddFavorite,
  useDeleteFavorite
} from '@/hooks/queries/use-favorite-mutation'
import { List } from '@telegram-apps/telegram-ui'
import { CryptoItem } from '@/components'
import React from 'react'
import { useUser } from '@/app/_providers/user-provider'

export default function TrendingPage() {
  const { userId } = useUser()

  const { data: trendingCryptos, isLoading: isTrendingCryptosLoading } = useTrendingCryptos()
  const { data: favoriteCryptos, isLoading: isFavoriteCryptosLoading } = useFavorites()

  const { mutate: addFavorite } = useAddFavorite()
  const { mutate: deleteFavorite } = useDeleteFavorite()

  const favorites = favoriteCryptos?.favorites || [];

  const handleFavoriteToggle = async (cryptoId: string) => {
    if (favorites.includes(cryptoId)) {
      deleteFavorite({ userId, cryptoId })
    } else {
      addFavorite({ userId, cryptoId })
    }
  }

  return (
    <Container back={true}>
      <Categories />

      <CryptoTableHeader />

      {!(trendingCryptos && favoriteCryptos) ||
      isTrendingCryptosLoading ||
      isFavoriteCryptosLoading ? (
        <CryptoSkeletonList itemsCount={10} />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
        >
          <List
            className={
              'grid gap-2 overflow-y-auto max-h-[70vh] !pb-[80px] scrollbar-none !pt-0 !px-0'
            }
          >
            {trendingCryptos.map((crypto, index) => (
              <CryptoItem
                isTrendingCrypto={true}
                userId={userId}
                index={index}
                key={crypto.id}
                crypto={crypto}
                favorites={favorites}
                onToggleFavorite={handleFavoriteToggle}
              />
            ))}
          </List>
        </motion.div>
      )}
    </Container>
  )
}
