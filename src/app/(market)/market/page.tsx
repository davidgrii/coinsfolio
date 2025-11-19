'use client'

import { motion } from 'framer-motion'
import { useSearchStore } from 'src/store'
import { useRef, useState } from 'react'

import { useTelegramUser } from '@/hooks/use-telegram-user'

import { useAddFavorite, useDeleteFavorite, useFavorites } from '@/features/favorites'
import { LoadMoreIndicator, useCryptoData, useSearchCrypto } from '@/features/crypto-data'
import { useIntersection } from '@/hooks/use-intersection'
import { Container } from '@/components/container'
import { Categories } from '@/components/categories'
import { SearchInput } from '@/components/search'
import { CryptoTableHeader } from '@/components/crypto-table-header'
import { CryptoSkeleton } from '@/components/crypto-skeleton'
import { Card } from '@/components/ui/card'
import { CryptoItem } from '@/components'

export default function MarketPage() {
  const { data } = useTelegramUser()
  const userId = data?.userId || ''

  const {
    cryptoData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading
  } = useCryptoData()

  const [searchValue, setSearchValue] = useState('')
  const inputRef = useRef<HTMLInputElement | null>(null)

  const { searchResults } = useSearchCrypto(searchValue)

  const { handleAdd: addFavorite } = useAddFavorite()
  const { favorites } = useFavorites(userId)
  const { handleDelete: removeFavorite } = useDeleteFavorite()

  const { isSearchOpen } = useSearchStore()

  const cursorRef = useIntersection(async () => {
    await fetchNextPage()
  })

  return (
    <Container className={'pt-0 mb-20'}>
      <Categories />

      {isSearchOpen && (
        <SearchInput
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          inputRef={inputRef}
        />
      )}

      <CryptoTableHeader
        isSearchEnabled={true}
      />

      {isLoading ? (
        <CryptoSkeleton itemsCount={10} />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: cryptoData.length > 0 ? 1 : 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Card className={'bg-background grid gap-8 border-0'}>
            {!searchValue ?
              cryptoData.map((crypto, index) => (
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

              : searchResults.map((crypto, index) => (
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
            }

            {!searchValue ? (
              <div ref={cursorRef}>
                <LoadMoreIndicator
                  hasNextPage={hasNextPage}
                  isFetchingNextPage={isFetchingNextPage}
                />
              </div>
            ) : null
            }
          </Card>
        </motion.div>
      )}

    </Container>
  )
}