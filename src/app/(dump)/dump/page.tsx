'use client';

import React from 'react';

import { motion } from 'framer-motion';

import { useTelegramUser } from '@/hooks/use-telegram-user';
import { CryptoItem } from '@/components';
import { CryptoTableHeader } from '@/components/crypto-table-header';
import { Container } from '@/components/container';
import { Categories } from '@/components/categories';
import { List } from '@telegram-apps/telegram-ui';
import { useDumpCryptos, useFavorites } from '@/hooks/queries/use-crypto';
import {
  useAddFavorite,
  useDeleteFavorite,
} from '@/hooks/queries/use-favorite-mutation';
import { CryptoSkeletonList } from '@/components/crypto-skeleton';

export default function DumpPage() {
  const { data } = useTelegramUser();
  const userId = data?.userId || '';

  const { data: dumpCryptos, isLoading: isDumpCryptosLoading } =
    useDumpCryptos();
  const { data: favoriteCryptos, isLoading: isFavoriteCryptosLoading } =
    useFavorites();

  const { mutate: addFavorite } = useAddFavorite();
  const { mutate: deleteFavorite } = useDeleteFavorite();

  const handleFavoriteToggle = async (cryptoId: string) => {
    if (favoriteCryptos?.favorites.includes(cryptoId)) {
      deleteFavorite({ userId, cryptoId });
    } else {
      addFavorite({ userId, cryptoId });
    }
  };

  return (
    <Container back={true}>
      <Categories />

      <CryptoTableHeader />

      {!(dumpCryptos && favoriteCryptos) ||
      isDumpCryptosLoading ||
      isFavoriteCryptosLoading ? (
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
              'grid gap-2 overflow-y-auto max-h-[70vh] pb-[64px] scrollbar-none !pt-0 !px-0'
            }
          >
            {dumpCryptos.map((crypto, index) => (
              <CryptoItem
                userId={userId}
                key={crypto.id}
                crypto={crypto}
                index={index}
                favorites={favoriteCryptos.favorites}
                onToggleFavorite={handleFavoriteToggle}
              />
            ))}
          </List>
        </motion.div>
      )}
    </Container>
  );
}
