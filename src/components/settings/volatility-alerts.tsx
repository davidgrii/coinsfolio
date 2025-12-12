import React, { useEffect, useState } from 'react';
import {
  Button,
  Modal,
  Placeholder,
  Select,
  Slider, Spinner,
  VisuallyHidden
} from '@telegram-apps/telegram-ui'
import { ModalHeader } from '@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader';
import { cn } from '@/components/ui/utils';
import { usePlatform } from '@/hooks/use-platfrom';
import { DialogTitle } from '@radix-ui/react-dialog';
import type { ConditionType, IPortfolio } from '@/types';
import {
  useCreateVolatilityAlert,
} from '@/hooks/queries/use-smart-alerts';

interface IProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children: React.ReactNode;
  portfolio: IPortfolio[] | undefined;
}

const volatilityOptions = ['1m', '5m', '10m', '1h']

export const VolatilityAlerts: React.FC<IProps> = ({
  isOpen,
  setIsOpen,
  children,
  portfolio,
}) => {
  const platform = usePlatform();
  const { mutate: createPriceAlertMutation, isPending: isCreateAlertPending } = useCreateVolatilityAlert();

  const [percentage, setPercentage] = useState(5);
  const [conditionType, setConditionType] = useState<ConditionType>('above');
  const [cryptoId, setCryptoId] = useState('');

  const portfolioOptions =
    portfolio?.map((item, index) => ({
      name: item.crypto.name,
      symbol: item.crypto.symbol,
    })) || [];

  const isFormCompleted = false;

  const handleChangePercentage = (value: number) => {
    setPercentage(value);
  };

  const handleSubmit = () => {
    const data = {
      id: '',
      cryptoId,
      percentage: String(percentage),
      condition_type: conditionType,
    };

    createPriceAlertMutation(
      { data: data },
      {
        onSuccess: () => {
          setPercentage(10);
          setIsOpen(false);
          alert('Volatility alert added successfully');
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

      <Placeholder header={'Volatility Alerts'} />

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
          <Select className='!bg-neutral-04'>
            {portfolioOptions.map(({ name, symbol }, index) => (
              <option key={index}>
                {name} - ({symbol.toUpperCase()})
              </option>
            ))}
          </Select>
        </div>

        <div className='w-full relative'>
          <Select
            onChange={(e) => {
              e.target.blur()
              setConditionType(e.target.value as ConditionType)
            }}
            className='!bg-neutral-04'
          >
            <option value='above'>Percentage Above +({percentage}) %</option>
            <option value='below'>Percentage Below -{percentage} %</option>
          </Select>
        </div>

        <div className='w-full relative'>
          <Select className='!bg-neutral-04'>
            {volatilityOptions.map((option, index) => (
              <option key={index} value={option}>Volatility ({option}) — {percentage}%</option>
            ))}
          </Select>
        </div>

        <div className='w-full relative'>
          <Slider
            step={1}
            min={1}
            max={20}
            defaultValue={percentage}
            onChange={handleChangePercentage}
            className='!bg-neutral-04 rounded-xl'
          />
        </div>

        <Button
          size='l'
          type='submit'
          mode='filled'
          disabled={!isFormCompleted}
          className='w-full'
        >
          {isCreateAlertPending ? <Spinner size='s' /> : 'Save'}
        </Button>
      </form>
    </Modal>
  );
};
