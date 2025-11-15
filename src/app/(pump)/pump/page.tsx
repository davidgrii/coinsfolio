'use client'

import React from 'react'

import { motion } from 'framer-motion'
import { useTelegramUser } from '@/hooks/use-telegram-user'
import { useAddFavorite, useDeleteFavorite, useFavorites } from '@/features/favorites'
import { Card, Categories, Container, CryptoItem, CryptoSkeleton, CryptoTableHeader } from '@/shared/ui'
import { usePumpCryptos } from '@/features/pump-dump/model/use-pump-crypto'

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

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.7 }}
      >
        <Card className={'bg-background grid gap-8 border-0'}>
          {isLoading ? (
            <CryptoSkeleton
              className={'justify-start'}
              itemsCount={10}
            />
          ) : (
            pumpCryptos.map((crypto, index) => (
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
        </Card>
      </motion.div>
    </Container>
  )
}
