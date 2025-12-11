import React, { type ChangeEvent, useEffect, useMemo, useState } from 'react';
import { Icons } from '@/components/icons';
import {
  Button,
  Input,
  Modal,
  Placeholder,
  Select,
  Tappable,
  VisuallyHidden,
} from '@telegram-apps/telegram-ui';
import { ModalHeader } from '@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader';
import { DialogTitle } from '@radix-ui/react-dialog';
import { useCreatePriceAlert } from '@/hooks/queries/use-smart-alerts';
import type { ConditionType, IPortfolio } from '@/types';
import { usePlatform } from '@/hooks/use-platfrom';
import { cn } from '@/components/ui/utils';

interface IProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children: React.ReactNode;
  portfolio: IPortfolio[] | undefined;
}

export const PriceAlerts: React.FC<IProps> = ({
  isOpen,
  setIsOpen,
  children,
  portfolio,
}) => {
  const platform = usePlatform();
  const { mutate: createPriceAlertMutation } = useCreatePriceAlert();

  const [price, setPrice] = useState('');
  const [conditionType, setConditionType] = useState<ConditionType>('above');
  const [cryptoId, setCryptoId] = useState('');

  const portfolioOptions =
    portfolio?.map((item, index) => ({
      name: item.crypto.name,
      symbol: item.crypto.symbol,
    })) || [];

  const isFormCompleted = price && cryptoId && conditionType;

  const handleChangePrice = (e: ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);
  };

  const handleSubmit = () => {
    const data = {
      id: '',
      cryptoId,
      price: price,
      condition_type: conditionType,
    };

    createPriceAlertMutation(
      { data: data },
      {
        onSuccess: () => {
          setPrice('');
          setIsOpen(false);
          alert('Price alert added successfully');
        },
      },
    );
  };

  useEffect(() => {
    if (portfolio?.length) {
      setCryptoId(portfolio?.[0]?.cryptoId);
    }
  }, [portfolio]);

  return (
    <Modal
      open={isOpen}
      onOpenChange={setIsOpen}
      header={<ModalHeader />}
      trigger={children}
      className='!bg-base-background backdrop-blur-lg !z-50 shadow-[0_0_0_2px_rgba(255,255,255,0.1)]'
    >
      <VisuallyHidden>
        <DialogTitle>Add Portfolio Modal</DialogTitle>
      </VisuallyHidden>

      <Placeholder header={'Price Alerts'} />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className={cn(
          'w-full flex flex-col gap-6 items-center justify-between px-3',
          platform === 'ios' ? 'pb-5' : 'pb-3',
        )}
      >
        <div className='w-full relative'>
          <Select
            onChange={(e) => setCryptoId(e.target.value)}
            className='!bg-neutral-04'
          >
            {portfolioOptions.map(({ name, symbol }, index) => (
              <option key={index}>
                {name} - ({symbol.toUpperCase()})
              </option>
            ))}
          </Select>
        </div>

        <div className='w-full relative'>
          <Select
            onChange={(e) => setConditionType(e.target.value as ConditionType)}
            className='!bg-neutral-04'
          >
            <option value='above'>Price Above ({price ? price : 'X'}) $</option>
            <option value='below'>Price Below ({price ? price : 'X'}) $</option>
          </Select>
        </div>

        <div className='w-full relative'>
          <Input
            type='text'
            placeholder='Price'
            value={price}
            onChange={handleChangePrice}
            after={
              price ? (
                <Tappable
                  Component='button'
                  className='bg-neutral-04 rounded-full'
                  onClick={() => setPrice('')}
                >
                  <Icons.close />
                </Tappable>
              ) : (
                <Icons.question
                  onClick={() =>
                    alert(
                      'Enter following crypto price Example: 123,450.32 or 0.00213',
                    )
                  }
                  className='size-5 mr-0.5 text-neutral-03 cursor-pointer duration-200 transition-opacity ease-out hover:opacity-80'
                />
              )
            }
            className='!bg-neutral-04'
          />
        </div>

        <Button
          size='l'
          mode='filled'
          type='submit'
          disabled={!isFormCompleted}
          className='w-full'
        >
          Save
        </Button>
      </form>
    </Modal>
  );
};
