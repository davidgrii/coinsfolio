'use client';

import React from 'react';

import { motion } from 'framer-motion';
import { Container } from '@/components/container';
import { Categories } from '@/components/categories';
import { CryptoTableHeader } from '@/components/crypto-table-header';
import { CryptoItem } from '@/components';
import { CryptoSkeletonList } from '@/components/crypto-skeleton-list';
import { List } from '@telegram-apps/telegram-ui';
import { useFavorites, usePumpCryptos } from '@/hooks/queries/use-crypto';
import {
  useAddFavorite,
  useDeleteFavorite,
} from '@/hooks/queries/use-favorite-mutation';
import { useUser } from '@/app/_providers/user-provider';
import { ANIMATE_CRYPTOS_LIST } from '@/constants';
import { CryptoList } from '@/components/ui/crypto-list'

export default function PumpPage() {
  const { userId } = useUser();

  const { data: pumpCryptos, isLoading: isPumpCryptosLoading } =
    usePumpCryptos();
  const { data: favoriteCryptos, isLoading: isFavoriteCryptosLoading } =
    useFavorites();

  const { mutate: addFavorite } = useAddFavorite();
  const { mutate: deleteFavorite } = useDeleteFavorite();

  const favorites = favoriteCryptos?.favorites || [];

  const handleFavoriteToggle = async (cryptoId: string) => {
    if (favorites.includes(cryptoId)) {
      deleteFavorite({ userId, cryptoId });
    } else {
      addFavorite({ userId, cryptoId });
    }
  };

  return (
    <Container back={true} className={'pt-0'}>
      <Categories />

      <CryptoTableHeader />

      {!(pumpCryptos && favoriteCryptos) ||
      isPumpCryptosLoading ||
      isFavoriteCryptosLoading ? (
        <CryptoSkeletonList itemsCount={10} />
      ) : (
        <CryptoList>
          {pumpCryptos.map((crypto, index) => (
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
  );
}
