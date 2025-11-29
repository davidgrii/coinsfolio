import React, { useMemo, useState } from 'react'
import { CirclePlus } from 'lucide-react';
import { ICrypto } from '@/types';
import { useTranslation } from 'react-i18next';
import { Icons } from '@/components/icons';
import {
  Avatar,
  Button,
  Divider,
  FixedLayout,
  Input,
  Modal,
  Placeholder,
  Tappable, Textarea
} from '@telegram-apps/telegram-ui'
import { ModalHeader } from '@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader';
import { useSearchCrypto } from '@/hooks/queries/use-crypto';
import { motion } from 'framer-motion';
import { useDebounceValue } from 'usehooks-ts'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/components/ui/utils'
import { usePlatform } from '@/hooks/use-platfrom'

interface IProps {
  isOpen: boolean;
  shouldShowTrigger?: boolean;
  setIsOpen: (state: boolean) => void;
  onAddCrypto: (
    cryptoId: string,
    quantity: number,
    purchase: number,
    notice?: string,
  ) => void;
}

export function SearchCryptoSkeleton() {
  return (
    <div className='flex items-center gap-4 px-4 py-2'>
      <Skeleton className='h-[28px] w-[28px] rounded-full' />
      <Skeleton className='h-[10px] w-[60px]' />
      <Skeleton className='h-[10px] w-[28px]' />
    </div>
  )
}

export const AddCrypto: React.FC<IProps> = ({
  shouldShowTrigger,
  onAddCrypto,
  isOpen,
  setIsOpen,

}) => {
  const [quantity, setQuantity] = useState('');
  const [purchase, setPurchase] = useState('');
  const [notice, setNotice] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [selectedCrypto, setSelectedCrypto] = useState<ICrypto | null>(null);
  const [debouncedSearchValue] = useDebounceValue(searchValue, 300);

  const platform = usePlatform();
  const { t } = useTranslation();

  const isFormCompleted = quantity && purchase && selectedCrypto;

  const cryptoQueryParams = useMemo(
    () => ({
      query: debouncedSearchValue || '',
      pageParam: 1,
      limit: 50,
    }),
    [debouncedSearchValue],
  );

  const { data: cryptos, isLoading: isCryptosLoading, isFetching: isCryptosFetching } = useSearchCrypto(cryptoQueryParams);

  const handleChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(e.target.value);
  };

  const handleChangePurchase = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPurchase(e.target.value);
  };

  const handleCryptoSelect = (crypto: ICrypto) => {
    setSelectedCrypto(crypto);
    setSearchValue('');
  };

  const handleRemoveCrypto = () => {
    setSelectedCrypto(null);
    setSearchValue('');
  };

  const handleSubmit = () => {
    if (selectedCrypto && quantity && purchase) {
      const cryptoId = selectedCrypto.id;
      const numericQuantity = Number(
        quantity.replace(/\s/g, '').replace(',', '.'),
      );
      const purchasePrice = Number(
        purchase.replace(/\s/g, '').replace(',', '.'),
      );

      if (
        isNaN(numericQuantity) ||
        numericQuantity <= 0 ||
        isNaN(purchasePrice) ||
        purchasePrice <= 0
      ) {
        console.error('Invalid quantity or purchase price');
        return;
      }

      onAddCrypto(cryptoId, numericQuantity, purchasePrice, notice);

      setSelectedCrypto(null);
      setPurchase('');
      setQuantity('');
      setNotice('');
      setIsOpen(false);
    }
  };

  return (
    <Modal
      open={true}
      onOpenChange={setIsOpen}
      header={<ModalHeader />}
      trigger={shouldShowTrigger ?
        <FixedLayout
          vertical='bottom'
          className='flex justify-center !bottom-[100px]'
        >
          <Button size='m'>
            <CirclePlus
              className={
                'w-9 h-9 cursor-pointer text-foreground transition-colors'
              }
            />
          </Button>
        </FixedLayout> : null
      }
      className='!bg-base-background !z-50'
    >
      <Placeholder header={t('add_crypto.add_coin')} />

      <form className='w-full flex flex-col gap-6 items-center justify-between px-3'>
        {selectedCrypto ? (
          <div className={cn('relative flex items-center justify-between w-full px-3 py-4 h-[50px] !bg-neutral-04 rounded-xl',
            (platform === 'ios' || platform === 'macos') && 'input-box-shadow'
          )}>
            <div className='flex items-center gap-3'>
              <div className='rounded-full overflow-hidden'>
                <Avatar
                  size={28}
                  src={selectedCrypto.image}
                  alt={selectedCrypto.name}
                  className='!bg-transparent'
                />
              </div>

              <div className={'flex-col'}>
                <p className='text-xs text-foreground '>
                  {selectedCrypto.symbol.toUpperCase()}
                </p>
                <p className='text-[8px] text-neutral-03'>
                  {selectedCrypto.name}
                </p>
              </div>
            </div>

            <Tappable
              Component='div'
              className='bg-neutral-04  rounded-xl mr-1'
              onClick={handleRemoveCrypto}
            >
              <Icons.close />
            </Tappable>
          </div>
        ) : (
          <div className='relative w-full'>
            <Input
              // autoFocus={true}
              type={'text'}
              inputMode={'text'}
              placeholder={t('add_crypto.choose')}
              value={searchValue}
              lang={'en'}
              onChange={(e) => setSearchValue(e.target.value)}
              after={searchValue && (
                <Tappable
                  Component='div'
                  className='bg-neutral-04  rounded-xl'
                  onClick={() => setSearchValue('')}
                >
                  <Icons.close />
                </Tappable>
              )}
              className='!bg-neutral-04'
            />

            {searchValue && (
                <div className='absolute top-14 mb-2 w-full z-10 border-neutral-04 border rounded-xl overflow-hidden'>
                  <div className='bg-base-background rounded-xl shadow-md max-h-[30vh] overflow-y-auto'>
                    {isCryptosLoading || isCryptosFetching ? (
                      new Array(8).fill(null).map((_, index) => (
                        <SearchCryptoSkeleton key={index} />
                      ))
                    ) : (
                      cryptos?.map((crypto) => (
                        <React.Fragment key={crypto.id}>
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1}}
                            transition={{ duration: 0.3 }}
                          >
                            <div
                              className='flex items-center gap-3 px-4 py-2 hover:bg-muted-foreground transition-colors duration-100 cursor-pointer hover:bg-neutral-04'
                              onClick={() => handleCryptoSelect(crypto)}
                            >
                              <div className='rounded-full overflow-hidden'>
                                <Avatar
                                  size={28}
                                  src={crypto.image}
                                  alt={crypto.name}
                                  className='!bg-transparent'
                                />
                              </div>

                              <p className='text-[13px] text-nowrap'>
                                {crypto.name.length > 18
                                  ? crypto.name.slice(0, 18) + '...'
                                  : crypto.name}{' '}
                                ({crypto.symbol.toUpperCase()})
                              </p>
                            </div>
                          </motion.div>
                          <Divider />
                        </React.Fragment>
                      ))
                    )}
                  </div>
                </div>
            )}
          </div>
        )}

        <div className='w-full relative'>
          <Input
            type='number'
            inputMode={'decimal'}
            placeholder={t('add_crypto.quantity')}
            value={quantity}
            onChange={handleChangeQuantity}
            after={quantity && (
              <Tappable
                Component='div'
                className='bg-neutral-04  rounded-xl'
                onClick={() => setQuantity('')}
              >
                <Icons.close />
              </Tappable>
              )
            }
            className='!bg-neutral-04 !w-full'
          />
        </div>

        <div className='w-full relative'>
          <Input
            type='number'
            inputMode={'decimal'}
            placeholder={t('add_crypto.purchase')}
            value={purchase}
            onChange={handleChangePurchase}
            after={purchase && (
              <Tappable
                Component='button'
                className='bg-neutral-04 rounded-full'
                onClick={() => setPurchase('')}
              >
                <Icons.close />
              </Tappable>
            )}
            className='!bg-neutral-04 !w-full'
          />
        </div>

        <div className='w-full relative'>
          <Textarea
            placeholder={t('add_crypto.note')}
            value={notice}
            onChange={(e) => setNotice(e.target.value)}
            className='!w-full !bg-neutral-04'
          />
        </div>

        <Button
          size='l'
          mode='filled'
          disabled={!isFormCompleted}
          onClick={handleSubmit}
          className={
            'bg-foreground py-8 rounded-xl text-lg text-background font-semibold mx-auto w-full transition-colors hover:bg-foreground/75'
          }
        >
          {t('add_crypto.btn')} {selectedCrypto?.symbol?.toUpperCase()}
        </Button>
      </form>
    </Modal>
  );
};
