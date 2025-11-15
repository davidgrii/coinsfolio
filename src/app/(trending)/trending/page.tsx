'use client'

import { motion } from 'framer-motion'

import { useTelegramUser } from '@/hooks/use-telegram-user'
import { useTrendingData } from '@/features/trending/models/use-trending-data'
import { TrendingCryptoItem } from '@/features/trending/ui/trending-crypto-item'

import { Card, Categories, Container, CryptoSkeleton, CryptoTableHeader } from '@/shared/ui'
import { useAddFavorite, useDeleteFavorite, useFavorites } from '@/features/favorites'

export default function TrendingPage() {
  const { trendingCrypto, isLoading } = useTrendingData()

  const { data } = useTelegramUser()
  const userId = data?.userId || ''

  const { favorites } = useFavorites(userId)
  const { handleAdd: addFavorite } = useAddFavorite()
  const { handleDelete: removeFavorite } = useDeleteFavorite()

  return (
    <Container className={'pt-0'}>
      <Categories />

      <CryptoTableHeader />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.7 }}
      >
        <Card className={'bg-background grid gap-8 border-0'}>
          {isLoading ? (
            <CryptoSkeleton itemsCount={10} />
          ) : (
            trendingCrypto.map((crypto, index) => (
              <TrendingCryptoItem
                userId={userId}
                index={index}
                key={crypto.id}
                crypto={crypto}
                favorites={favorites}
                addFavorite={addFavorite}
                removeFavorite={removeFavorite}
              />
            ))
          )}
        </Card>
      </motion.div>
    </Container>
  )
}
