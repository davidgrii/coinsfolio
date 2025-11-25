import React, { useMemo, useState } from 'react'
import { CirclePlus } from 'lucide-react';
import { ICrypto } from '@/types';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
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
import { Icon24Close } from '@telegram-apps/telegram-ui/dist/icons/24/close';
import { useSearchCrypto } from '@/hooks/queries/use-crypto';
import { formatNumber } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';
import { useDebounceValue } from 'usehooks-ts'

function AddCryptoModalSkeleton() {
  return (
    <div className='flex flex-col items-center justify-center px-3 mb-8'>
      <Skeleton className={'animate-pulse h-[70px] w-full rounded-xl mb-8'} />

      <Skeleton className={'animate-pulse h-[200px] w-full rounded-xl mb-8'} />
      <Skeleton className={'animate-pulse h-[200px] w-full rounded-xl '} />
    </div>
  );
}

interface IProps {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
  isEmpty: boolean;
  onAddCrypto: (
    cryptoId: string,
    quantity: number,
    purchase: number,
    notice?: string,
  ) => void;
}

export const AddCrypto: React.FC<IProps> = ({
  onAddCrypto,
  isOpen,
  setIsOpen,
  isEmpty,
}) => {
  const [quantity, setQuantity] = useState('');
  const [purchase, setPurchase] = useState('');
  const [notice, setNotice] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [selectedCrypto, setSelectedCrypto] = useState<ICrypto | null>(null);
  const [debouncedSearchValue] = useDebounceValue(searchValue, 300);

  const { t } = useTranslation();

  const cryptoQueryParams = useMemo(
    () => ({
      query: debouncedSearchValue || '',
      pageParam: 1,
      limit: 50,
    }),
    [debouncedSearchValue],
  );

  const { data: cryptos, isLoading: isCryptosLoading } = useSearchCrypto(cryptoQueryParams);

  const handleChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const formattedValue = formatNumber(value);

    setQuantity(formattedValue);
  };

  const handleChangePurchase = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const formattedValue = formatNumber(value);

    setPurchase(formattedValue);
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
      open={isOpen}
      onOpenChange={setIsOpen}
      header={<ModalHeader />}
      trigger={
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
        </FixedLayout>
      }
      className='!bg-base-background h-screen px-3'
    >
      <Placeholder header={t('add_crypto.add_coin')} />

      <form className='w-full flex flex-col gap-6 items-center justify-between'>
        {selectedCrypto ? (
          <div className='relative flex items-center justify-between w-full px-3 py-4 h-[50px] !bg-neutral-04 rounded-xl'>
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
              autoFocus={true}
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

            {searchValue && cryptos && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <div className='absolute -bottom-52 mb-2 w-full z-10 border border-base-foreground/10 rounded-xl overflow-hidden'>
                  <div
                    className={
                      'bg-base-background rounded-xl shadow-md max-h-52 overflow-y-auto'
                    }
                  >
                    {cryptos.map((crypto) => (
                      <React.Fragment key={crypto.id}>
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.8 }}
                        >
                          <div
                            className='flex items-center gap-3 px-4 py-2 hover:bg-muted-foreground rounded-lg cursor-pointer'
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
                    ))}
                  </div>
                </div>
              </motion.div>
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
