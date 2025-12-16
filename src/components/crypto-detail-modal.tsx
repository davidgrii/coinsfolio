'use client';

import {useCryptoModalStore} from '@/store/crypto/crypto-modal.store';
import React from 'react';
import {formatPriceWithDecimals, getDynamicFontSize} from '@/lib/utils';
import {
  Avatar,
  Button,
  Divider,
  FixedLayout,
  IconButton,
  Modal,
  Placeholder,
  VisuallyHidden,
} from '@telegram-apps/telegram-ui';
import {
  ModalHeader
} from '@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader';
import {useCrypto, useFavorites} from '@/hooks/queries/use-crypto';
import {Skeleton} from '@/components/ui/skeleton';
import {useAddFavorite, useDeleteFavorite,} from '@/hooks/queries/use-favorite-mutation';
import {motion} from 'framer-motion';
import {Icons} from '@/components/icons';
import {useTranslation} from 'react-i18next';
import {ICoinGlobalMarketsData, IMarketsCoinData} from '@/types';
import {COINGEKO_URL, EXCHANGE_REF_URLS} from '@/constants';
import {cn} from '@/components/ui/utils';
import {usePlatform} from '@/hooks/use-platfrom';
import {DialogTitle} from '@radix-ui/react-dialog';
import {useUser} from '@/app/_providers/user-provider';

function CryptoItemModalSkeleton() {
  return (
    <div className='flex flex-col items-center justify-center px-3'>
      <Skeleton className={'animate-pulse h-[70px] w-full rounded-xl mb-8'} />

      <Skeleton className={'animate-pulse h-[200px] w-full rounded-xl mb-8'} />
      <Skeleton className={'animate-pulse h-[200px] w-full rounded-xl '} />
    </div>
  );
}

// TODO: delete selectedCrypto instead of Crypto

export const CryptoItemModal = () => {
  const { userId } = useUser();
  const { t } = useTranslation();

  const { isOpen, selectedCrypto, setIsOpen } = useCryptoModalStore();
  const { data: crypto, isLoading } = useCrypto(selectedCrypto?.id || '');
  const { data: favoriteCryptos, isLoading: isFavoriteLoading } = useFavorites();

  const { mutate: addFavorite } = useAddFavorite();
  const { mutate: deleteFavorite } = useDeleteFavorite();

  const platform = usePlatform();

  const cryptoPrice =
    selectedCrypto?.current_price || selectedCrypto?.price || 0;
  const favorites = favoriteCryptos?.favorites || [];
  const isFavorite = favorites.includes(selectedCrypto?.id || '');

  const handleFavoriteToggle = async (cryptoId: string) => {
    if (favorites.includes(cryptoId)) {
      deleteFavorite({ userId, cryptoId });
    } else {
      addFavorite({ userId, cryptoId });
    }
  };

  return (
    <>
      <Modal
        header={<Modal.Header />}
        open={isOpen}
        onOpenChange={setIsOpen}
        className='!h-screen !bg-base-background !z-30'
      >
        <VisuallyHidden>
          <DialogTitle>Open Detail Crypto Modal</DialogTitle>
        </VisuallyHidden>

        {!crypto || !selectedCrypto || isLoading ? (
          <CryptoItemModalSkeleton />
        ) : (
          <div
            className={cn(
              'px-3 scrollbar-none',
              platform === 'ios' || platform === 'macos' ? 'pb-16' : 'pb-24',
            )}
          >
            <div className='flex justify-between w-full bg-neutral-04 items-center gap-3 px-6 py-3.5 rounded-xl select-none mb-10'>
              <div className={'flex items-center gap-2'}>
                <div className='rounded-full overflow-hidden'>
                  <Avatar
                    size={40}
                    src={selectedCrypto.image}
                    alt={selectedCrypto.name}
                    className='!bg-transparent'
                  />
                </div>

                <div className='flex flex-col items-start'>
                  <div className={'flex gap-1 h-4 text-neutral-03'}>
                    <p className='text-[11px] font-semibold truncate'>
                      {selectedCrypto.name.length > 10
                        ? `${selectedCrypto.name.slice(0, 14)}...`
                        : selectedCrypto.name}
                    </p>
                    <span className='w-5 text-[11px] text-muted-foreground font-medium'>
                      #{selectedCrypto.market_cap_rank}
                    </span>
                  </div>

                  <p
                    className={`${getDynamicFontSize(cryptoPrice)} text-foreground font-bold whitespace-nowrap`}
                  >
                    {formatPriceWithDecimals(cryptoPrice)} $
                  </p>
                </div>
              </div>

              <div className={'flex gap-3 items-center'}>
                <motion.button
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className='p-1 pb-[6px]'
                  onClick={() => handleFavoriteToggle(selectedCrypto.id)}
                >
                  {isFavorite ? (
                    <Icons.favorites className={'w-5 h-5 text-[#FFB364]'} />
                  ) : (
                    <Icons.favoritesOutline className={'w-5 h-5'} />
                  )}
                </motion.button>

                <a
                  href={`${COINGEKO_URL}${'/' + selectedCrypto.id}`}
                  rel='noreferrer'
                  target='_blank'
                >
                  <IconButton mode='bezeled' size='s'>
                    <Icons.globus />
                  </IconButton>
                </a>
              </div>
            </div>

            <DetailsCoinsData cryptoMarketStats={crypto.coin_market_stats} />

            {crypto.exchanges.length ? (
              <DetailsMarketsData cryptoMarketsData={crypto.exchanges} />
            ) : null}

            <Modal
              header={<ModalHeader />}
              trigger={
                <FixedLayout
                  className={cn(
                    'px-3',
                    (platform === 'macos' && '!bottom-18') ||
                      (platform === 'ios' && '!bottom-22') ||
                      '!bottom-24',
                  )}
                >
                  <Button size='l' stretched mode='filled'>
                    {t('crypto_details_popup.btn')}{' '}
                    {selectedCrypto.symbol.toUpperCase()}
                  </Button>
                </FixedLayout>
              }
              className='!h-[92%] !bg-base-background'
            >
              <VisuallyHidden>
                <DialogTitle>Choose service</DialogTitle>
              </VisuallyHidden>

              <Placeholder header={t('crypto_details_popup.exchanges')} />

              <div className='flex flex-col gap-4 px-3'>
                {EXCHANGE_REF_URLS.map(({ label, url }) => (
                  <a href={url} target='_blank' rel='noreferrer' key={label}>
                    <Button size='l' stretched mode='filled'>
                      {t('crypto_details_popup.btn')}{' '}
                      {selectedCrypto.symbol.toUpperCase()} on {label}
                    </Button>
                  </a>
                ))}
              </div>
            </Modal>
          </div>
        )}
      </Modal>
    </>
  );
};

const DetailsCoinsData = ({
  cryptoMarketStats,
}: {
  cryptoMarketStats: IMarketsCoinData;
}) => {
  const { t } = useTranslation();

  return (
    <div className={'flex flex-col items-center justify-center w-full mb-10'}>
      <h3 className={'text-sm mb-0.5'}>
        {t('crypto_details_popup.coins_data')}
      </h3>

      <div
        className={
          'bg-accent w-full flex flex-col rounded-xl gap-0.5 text-sm font-medium  text-nowrap'
        }
      >
        <div className={'flex justify-between'}>
          <p>{t('crypto_details_popup.coin_data_table.market_cap')}</p>
          <p>{formatPriceWithDecimals(cryptoMarketStats?.market_cap)} $</p>
        </div>

        <Divider />

        <div className={'flex justify-between'}>
          <p>{t('crypto_details_popup.coin_data_table.fdv')}</p>
          <p>{formatPriceWithDecimals(cryptoMarketStats?.fdv)} $</p>
        </div>

        <Divider />

        <div className={'flex justify-between'}>
          <p>{t('crypto_details_popup.coin_data_table.volume_24h')}</p>
          <p>{formatPriceWithDecimals(cryptoMarketStats?.volume_24h)} $</p>
        </div>

        <Divider />

        <div className={'flex justify-between'}>
          <p>{t('crypto_details_popup.coin_data_table.circulation_supply')}</p>
          <p>
            {formatPriceWithDecimals(
              Number(cryptoMarketStats?.circulating_supply) || 0,
            )}{' '}
            $
          </p>
        </div>

        <Divider />

        <div className={'flex justify-between'}>
          <p>{t('crypto_details_popup.coin_data_table.total_supply')}</p>
          <p>
            {formatPriceWithDecimals(
              Number(cryptoMarketStats?.total_supply) || 0,
            )}{' '}
            $
          </p>
        </div>

        <Divider />

        <div className={'flex justify-between'}>
          <p>{t('crypto_details_popup.coin_data_table.ath')}</p>
          <p>{formatPriceWithDecimals(cryptoMarketStats?.all_time_high)} $</p>
        </div>
      </div>
    </div>
  );
};

const DetailsMarketsData = ({
  cryptoMarketsData,
}: {
  cryptoMarketsData: ICoinGlobalMarketsData[];
}) => {
  const { t } = useTranslation();

  return (
    <div className={'flex flex-col items-center justify-center w-full mb-16'}>
      <div
        className={
          'flex justify-between items-end w-full text-xs text-neutral-03 mb-0.5 font-medium px-6'
        }
      >
        <span>{t('crypto_details_popup.exchange')}</span>
        <h3 className={'text-sm text-base-foreground pl-2'}>
          {t('crypto_details_popup.markets')}
        </h3>
        <span>{t('crypto_details_popup.volume_24h')}</span>
      </div>

      <div className={'w-full py-3 text-sm font-medium text-foreground'}>
        {cryptoMarketsData.map((item, index) => (
          <React.Fragment key={index}>
            <div className={`flex justify-between mb-1 pb-1`}>
              <p>{item.exchange}</p>
              <p>{formatPriceWithDecimals(item.volume_24h)} $</p>
            </div>

            {index !== cryptoMarketsData.length - 1 ? <Divider /> : ''}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
