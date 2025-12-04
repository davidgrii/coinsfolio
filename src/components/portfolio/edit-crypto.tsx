import React, { useEffect, useState } from 'react';
import { Icons } from '@/components/icons';
import { useTranslation } from 'react-i18next';
import { formatNumber, isValidNumericInput, parseNumericInput } from '@/lib/utils'
import type { IPortfolio, IUpdatedCrypto } from '@/types';
import {
  Avatar,
  Button,
  Input,
  Modal,
  Placeholder,
  Tappable,
  Textarea
} from '@telegram-apps/telegram-ui'
import {
  ModalHeader
} from '@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader'
import { cn } from '@/components/ui/utils'
import { usePlatform } from '@/hooks/use-platfrom'

interface IProps {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
  item: IPortfolio | null;
  onEditCrypto: (updatedCrypto: IUpdatedCrypto) => void;
}

export const EditCrypto: React.FC<IProps> = ({
  isOpen,
  setIsOpen,
  item,
  onEditCrypto,
}) => {
  const [selectedCrypto, setSelectedCrypto] = useState<IPortfolio | null>(item);
  const [quantity, setQuantity] = useState<string | undefined>(item?.quantity?.toString() || '',);
  const [purchase, setPurchase] = useState<string | undefined>(item?.purchasePrice?.toString() || '',);
  const [notice, setNotice] = useState<string>(item?.notice || '');

  const platform = usePlatform();
  const { t } = useTranslation();

  const handleChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (!isValidNumericInput(value)) return;

    setQuantity(value);
  };

  const handleChangePurchase = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (!isValidNumericInput(value)) return;
    setPurchase(value);
  };

  const handleSubmit = () => {
    if (selectedCrypto && quantity && purchase) {

      const numericQuantity = parseNumericInput(quantity)
      const purchasePrice = parseNumericInput(purchase)

      const updatedData = {
        cryptoId: selectedCrypto.cryptoId,
        quantity: numericQuantity,
        purchasePrice: purchasePrice,
        notice: notice.trim() || '',
      };

      onEditCrypto(updatedData);
      setIsOpen(false);

    }
  };

  useEffect(() => {
    setSelectedCrypto(item);
    setQuantity(item?.quantity?.toString() || '');
    setPurchase(item?.purchasePrice?.toString() || '');
    setNotice(item?.notice || '');
  }, [item]);

  return (
    <>
      <Modal
        open={isOpen}
        onOpenChange={setIsOpen}
        header={<ModalHeader />}
        className='!bg-base-background !h-[96dvh] !min-h-[96dvh] !max-h-[96dvh] !z-50'
      >
        <Placeholder header={t('edit_crypto.edit_coin')} />

        <form className='w-full flex flex-col gap-6 items-center justify-between px-3'>
          {selectedCrypto && (
            <div className={cn('relative flex items-center justify-between w-full px-3 py-4 h-[50px] !bg-neutral-04 rounded-xl',
              !(platform === 'ios' || platform === 'macos') && 'input-box-shadow'
            )}>
              <div className='flex items-center gap-3'>
                <div className='rounded-full overflow-hidden'>
                  <Avatar
                    size={28}
                    src={selectedCrypto.crypto.image}
                    alt={selectedCrypto.crypto.name}
                    className='!bg-transparent'
                  />
                </div>

                <div className={'flex-col'}>
                  <p className='text-xs text-foreground '>
                    {selectedCrypto.crypto.symbol.toUpperCase()}
                  </p>
                  <p className='text-[8px] text-neutral-03'>
                    {selectedCrypto.crypto.name}
                  </p>
                </div>
              </div>
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
              )}
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
            {t('edit_crypto.btn')} {selectedCrypto?.crypto.symbol?.toUpperCase()}
          </Button>
        </form>
      </Modal>
    </>
  );
};
