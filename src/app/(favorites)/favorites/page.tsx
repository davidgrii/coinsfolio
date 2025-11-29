'use client';

import { motion } from 'framer-motion';

import { useTelegramUser } from '@/hooks/use-telegram-user';

import { Container } from '@/components/container';
import { Categories } from '@/components/categories';
import { CryptoTableHeader } from '@/components/crypto-table-header';
import { CryptoSkeletonList } from '@/components/crypto-skeleton';
import { CryptoItem } from '@/components';
import { List } from '@telegram-apps/telegram-ui';
import { useFavorites } from '@/hooks/queries/use-crypto';
import {
  useAddFavorite,
  useDeleteFavorite,
} from '@/hooks/queries/use-favorite-mutation';
import { EmptyFavorites } from '@/components/favorites/empty-favorites';
import { cn } from '@/components/ui/utils'
import { usePlatform } from '@/hooks/use-platfrom'

export default function FavoritesPage() {
  const { data } = useTelegramUser();
  const userId = data?.userId || '';
  const platform = usePlatform()

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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
        >
          <List
            className={cn(
              'grid gap-2 overflow-y-auto max-h-[70vh] pb-[64px] scrollbar-none !pt-0 !px-0'

            )}
          >
            {showEmptyMessage ? (
              <EmptyFavorites isFavoritesEmpty={true} />
            ) : (
              favoriteCryptos.data.map((crypto, index) => (
                <CryptoItem
                  userId={userId}
                  key={crypto.id}
                  crypto={crypto}
                  index={index}
                  favorites={favoriteCryptos.favorites}
                  onToggleFavorite={handleFavoriteToggle}
                />
              ))
            )}
          </List>
        </motion.div>
      )}
    </Container>
  );
}
