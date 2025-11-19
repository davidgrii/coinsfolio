'use client'

import React from 'react'

import { motion } from 'framer-motion'
import { useTelegramUser } from '@/hooks/use-telegram-user'
import { useAddFavorite, useDeleteFavorite, useFavorites } from '@/features/favorites'
import { usePumpCryptos } from '@/features/pump-dump/model/use-pump-crypto'
import { Container } from '@/components/container'
import { Categories } from '@/components/categories'
import { CryptoTableHeader } from '@/components/crypto-table-header'
import { Card } from '@/components/ui/card'
import { CryptoItem } from '@/components'
import { CryptoSkeleton } from '@/components/crypto-skeleton'

export default function PumpPage() {
  const { data } = useTelegramUser()
  const userId = data?.userId || ''

  const { pumpCryptos = [], isLoading } = usePumpCryptos()

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
            {pumpCryptos.map((crypto, index) => (
              <CryptoItem
                userId={userId}
                key={crypto.id}
                crypto={crypto}
                index={index}
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
