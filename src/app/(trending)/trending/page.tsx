'use client'

import { Container } from '@/components/container'
import { Categories } from '@/components/categories'
import { CryptoTableHeader } from '@/components/crypto-table-header'
import { CryptoSkeletonList } from '@/components/crypto-skeleton-list'
import { useFavorites, useTrendingCryptos } from '@/hooks/queries/use-crypto'
import {
  useAddFavorite,
  useDeleteFavorite
} from '@/hooks/queries/use-favorite-mutation'
import { CryptoItem } from '@/components'
import React from 'react'
import { useUser } from '@/app/_providers/user-provider'
import { CryptoList } from '@/components/ui/crypto-list'

export default function TrendingPage() {
  const { userId } = useUser()

  const { data: trendingCryptos, isLoading: isTrendingCryptosLoading } =
    useTrendingCryptos()
  const { data: favoriteCryptos, isLoading: isFavoriteCryptosLoading } =
    useFavorites()

  const { mutate: addFavorite } = useAddFavorite()
  const { mutate: deleteFavorite } = useDeleteFavorite()

  const favorites = favoriteCryptos?.favorites || []

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
        <CryptoList>
          {trendingCryptos.map((crypto, index) => (
            <CryptoItem
              isTrendingCrypto={true}
              index={index}
              key={crypto.id}
              crypto={crypto}
              favorites={favorites}
              onToggleFavorite={handleFavoriteToggle}
            />
          ))}
        </CryptoList>
      )}
    </Container>
  )
}
