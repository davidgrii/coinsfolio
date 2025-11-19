'use client'

import { motion } from 'framer-motion'

import { useTelegramUser } from '@/hooks/use-telegram-user'
import { useTrendingData } from '@/features/trending/models/use-trending-data'
import { TrendingCryptoItem } from '@/features/trending/ui/trending-crypto-item'

import { useAddFavorite, useDeleteFavorite, useFavorites } from '@/features/favorites'
import { Container } from '@/components/container'
import { Categories } from '@/components/categories'
import { CryptoTableHeader } from '@/components/crypto-table-header'
import { Card } from '@/components/ui/card'
import { CryptoSkeleton } from '@/components/crypto-skeleton'

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

      {isLoading ? (
        <CryptoSkeleton itemsCount={10} />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Card className={'bg-background grid gap-8 border-0'}>
            {trendingCrypto.map((crypto, index) => (
              <TrendingCryptoItem
                userId={userId}
                index={index}
                key={crypto.id}
                crypto={crypto}
                favorites={favorites}
                addFavorite={addFavorite}
                removeFavorite={removeFavorite}
              />
            ))}
          </Card>
        </motion.div>
      )}
    </Container>
  )
}
