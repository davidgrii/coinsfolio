'use client'

import { motion } from 'framer-motion'

import { useTelegramUser } from '@/hooks/use-telegram-user'

import { EmptyFavorites, useAddFavorite, useDeleteFavorite, useFavorites } from '@/features/favorites'
import { Container } from '@/components/container'
import { Categories } from '@/components/categories'
import { CryptoTableHeader } from '@/components/crypto-table-header'
import { CryptoSkeleton } from '@/components/crypto-skeleton'
import { CryptoItem } from '@/components'
import { List } from '@telegram-apps/telegram-ui'

export default function FavoritesPage() {
  const { data } = useTelegramUser()
  const userId = data?.userId || ''

  const { cryptoData: favoritesCryptoData, favorites, isLoading } = useFavorites(userId)
  const { handleDelete: removeFavorite } = useDeleteFavorite()
  const { handleAdd: addFavorite } = useAddFavorite()

  const showEmptyMessage = !isLoading && favoritesCryptoData.length === 0
  
  return (
    <Container back={true} className={'pt-0'}>
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
          <List className={'grid gap-2 overflow-y-auto max-h-screen scrollbar-none'}>
            {showEmptyMessage ? (
              <EmptyFavorites isFavoritesEmpty={true} />
            ) : (
              favoritesCryptoData.map((crypto, index) => (
                <CryptoItem
                  userId={userId}
                  key={crypto.id}
                  crypto={crypto}
                  index={index}
                  favorites={favorites}
                  addFavorite={addFavorite}
                  removeFavorite={removeFavorite}
                />
              ))
            )}
          </List>
        </motion.div>
      )}
    </Container>
  )
}
