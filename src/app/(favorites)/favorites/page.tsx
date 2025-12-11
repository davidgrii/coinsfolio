'use client';

import { motion } from 'framer-motion';

import { Container } from '@/components/container';
import { Categories } from '@/components/categories';
import { CryptoTableHeader } from '@/components/crypto-table-header';
import { CryptoSkeletonList } from '@/components/crypto-skeleton-list';
import { CryptoItem } from '@/components';
import { List } from '@telegram-apps/telegram-ui';
import { useFavorites } from '@/hooks/queries/use-crypto';
import {
  useAddFavorite,
  useDeleteFavorite,
} from '@/hooks/queries/use-favorite-mutation';
import { EmptyFavorites } from '@/components/favorites/empty-favorites';
import { cn } from '@/components/ui/utils';
import { useUser } from '@/app/_providers/user-provider';
import { ANIMATE_CRYPTOS_LIST } from '@/constants';
import { CryptoList } from '@/components/ui/crypto-list'

export default function FavoritesPage() {
  const { userId } = useUser();

  const { data: favoriteCryptos, isLoading: isFavoriteCryptoLoading } =
    useFavorites();
  const { mutate: deleteFavorite } = useDeleteFavorite();
  const { mutate: addFavorite } = useAddFavorite();

  const showEmptyMessage =
    !isFavoriteCryptoLoading && favoriteCryptos?.data.length === 0;

  const handleFavoriteToggle = async (cryptoId: string) => {
    if (favoriteCryptos?.favorites.includes(cryptoId)) {
      deleteFavorite({ userId, cryptoId });
    } else {
      addFavorite({ userId, cryptoId });
    }
  };

  return (
    <Container back={true} className={'pt-0'}>
      <Categories />

      <CryptoTableHeader />

      {!favoriteCryptos || isFavoriteCryptoLoading ? (
        <CryptoSkeletonList itemsCount={10} />
      ) : (
        <CryptoList>
          {showEmptyMessage ? (
            <EmptyFavorites isFavoritesEmpty={true} />
          ) : (
            favoriteCryptos.data.map((crypto, index) => (
              <CryptoItem
                key={crypto.id}
                crypto={crypto}
                index={index}
                favorites={favoriteCryptos.favorites}
                onToggleFavorite={handleFavoriteToggle}
              />
            ))
          )}
        </CryptoList>
      )}
    </Container>
  );
}
