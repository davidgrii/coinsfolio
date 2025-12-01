'use client';

import { useSearchStore } from 'src/store';
import React, { useMemo, useRef, useState } from 'react';

import { useIntersection } from '@/hooks/use-intersection';
import { Container } from '@/components/container';
import { Categories } from '@/components/categories';
import { SearchInput } from '@/components/market/search';
import { CryptoTableHeader } from '@/components/crypto-table-header';
import { CryptoSkeletonList } from '@/components/crypto-skeleton-list';
import { CryptoItem, Icons } from '@/components';
import { List, Spinner } from '@telegram-apps/telegram-ui';
import { motion } from 'framer-motion';
import {
  useInfiniteCryptos,
  useSearchCrypto,
} from '@/hooks/queries/use-crypto';
import {
  useAddFavorite,
  useDeleteFavorite,
} from '@/hooks/queries/use-favorite-mutation';
import { useFavorites } from '@/hooks/queries/use-crypto';
import { useDebounceValue } from 'usehooks-ts';
import { useUser } from '@/app/_providers/user-provider'

export default function MarketPage() {
  const { userId } = useUser();

  const [searchValue, setSearchValue] = useState('');
  const [debouncedSearchValue] = useDebounceValue(searchValue, 300);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const cryptoQueryParams = useMemo(
    () => ({
      query: debouncedSearchValue || '',
      pageParam: 1,
      limit: 50,
    }),
    [debouncedSearchValue],
  );

  const {
    data: rawCryptoPages,
    isLoading: isCryptosLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteCryptos();
  const { data: searchResults, isLoading: isSearchResultsLoading } =
    useSearchCrypto(cryptoQueryParams);
  const { data: favoriteCryptos, isLoading: isFavoriteLoading } =
    useFavorites();
  const { isSearchOpen } = useSearchStore();

  const { mutate: addFavorite } = useAddFavorite();
  const { mutate: deleteFavorite } = useDeleteFavorite();

  const favorites = favoriteCryptos?.favorites || [];

  const cursorRef = useIntersection(async () => {
    await fetchNextPage();
  });

  const cryptosItems = useMemo(
    () => rawCryptoPages?.pages.flatMap((page) => page.data) ?? [],
    [rawCryptoPages],
  );

  const handleFavoriteToggle = async (cryptoId: string) => {
    if (favorites.includes(cryptoId)) {
      deleteFavorite({ userId, cryptoId });
    } else {
      addFavorite({ userId, cryptoId });
    }
  };

  return (
    <Container back={false}>
      <Categories />

      {isSearchOpen && (
        <SearchInput
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          inputRef={inputRef}
        />
      )}

      <CryptoTableHeader isSearchEnabled={true} />

      {!cryptosItems || isCryptosLoading ? (
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
              'grid gap-2 overflow-y-auto overflow-x-hidden max-h-[70vh] !pb-[80px] scrollbar-none !pt-0 !px-0'
            }
          >
            {searchResults
              ? searchResults.map((crypto, index) => (
                  <CryptoItem
                    userId={userId}
                    key={crypto.id}
                    crypto={crypto}
                    index={index}
                    favorites={favorites}
                    onToggleFavorite={handleFavoriteToggle}
                  />
                ))
              : cryptosItems.map((crypto, index) => (
                  <CryptoItem
                    userId={userId}
                    key={crypto.id}
                    crypto={crypto}
                    index={index}
                    favorites={favorites}
                    onToggleFavorite={handleFavoriteToggle}
                  />
                )
              )
            }

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
  );
}

interface IProps {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  className?: string;
}

const LoadMoreIndicator: React.FC<IProps> = ({
  hasNextPage,
  isFetchingNextPage,
}) => {
  if (hasNextPage && !isFetchingNextPage) return <div className='mx-auto w-fit'><Spinner size='m' /></div>

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {!hasNextPage ? (
        <div className={'flex justify-center gap-2 items-center'}>
          <span className='relative flex h-3 w-3'>
            <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75'></span>
            <span className='relative inline-flex rounded-full h-3 w-3 bg-[#007AFF]'></span>
          </span>

          <span className={'text-sm'}>No more data...</span>
        </div>
      ) : (
        !isFetchingNextPage && (
          <div className={'flex justify-center gap-2 items-center'}>
            <Icons.spinner className={'w-[25px] h-[25px]'} />

            <span className={'text-sm'}>Loading crypto...</span>
          </div>
        )
      )}
    </motion.div>
  );
};
