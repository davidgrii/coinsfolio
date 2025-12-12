'use client'

import React from 'react'

import { CryptoItem } from '@/components'
import { CryptoTableHeader } from '@/components/crypto-table-header'
import { Container } from '@/components/container'
import { Categories } from '@/components/categories'
import { useDumpCryptos, useFavorites } from '@/hooks/queries/use-crypto'
import {
  useAddFavorite,
  useDeleteFavorite
} from '@/hooks/queries/use-favorite-mutation'
import { CryptoSkeletonList } from '@/components/crypto-skeleton-list'
import { useUser } from '@/app/_providers/user-provider'
import { CryptoList } from '@/components/ui/crypto-list'

export default function DumpPage() {
  const { userId } = useUser()

  const { data: dumpCryptos, isLoading: isDumpCryptosLoading } =
    useDumpCryptos()
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

      {!(dumpCryptos && favoriteCryptos) ||
      isDumpCryptosLoading ||
      isFavoriteCryptosLoading ? (
        <CryptoSkeletonList itemsCount={10} />
      ) : (
        <CryptoList>
          {dumpCryptos.map((crypto, index) => (
            <CryptoItem
              key={crypto.id}
              crypto={crypto}
              index={index}
              favorites={favorites}
              onToggleFavorite={handleFavoriteToggle}
            />
          ))}
        </CryptoList>
      )}
    </Container>
  )
}
