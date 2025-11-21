'use client'

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
import { CryptoItem } from '@/components'
import { List } from '@telegram-apps/telegram-ui'
import { motion } from 'framer-motion'

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
    <Container back={false} className={'pt-0 mb-20'}>
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
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
        >
        <List className={'grid gap-2 overflow-y-auto max-h-screen scrollbar-none'}>
          {cryptoData.map((crypto, index) => (
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

          {!searchValue ? (
            <div ref={cursorRef}>
              <LoadMoreIndicator
                hasNextPage={hasNextPage}
                isFetchingNextPage={isFetchingNextPage}
              />
            </div>
          ) : null}
        </List>
        </motion.div>
      )}

    </Container>
  )
}