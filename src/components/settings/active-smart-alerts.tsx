import React, { type ChangeEvent, useEffect, useMemo, useState } from 'react';
import { CirclePlus } from 'lucide-react';
import { type ConditionType, ICrypto, type IPortfolio } from '@/types';
import { useTranslation } from 'react-i18next';
import { Icons } from '@/components/icons';
import {
  Avatar,
  Button, Cell, Checkbox,
  Divider,
  FixedLayout, IconContainer,
  Input,
  Modal,
  Multiselect,
  Placeholder,
  Section,
  Select,
  Slider, Spinner,
  Tappable,
  Textarea,
  VisuallyHidden
} from '@telegram-apps/telegram-ui'
import { ModalHeader } from '@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader';
import { useSearchCrypto } from '@/hooks/queries/use-crypto';
import { motion } from 'framer-motion';
import { useDebounceValue } from 'usehooks-ts';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/components/ui/utils';
import { usePlatform } from '@/hooks/use-platfrom';
import { DialogTitle } from '@radix-ui/react-dialog';
import { ANIMATE_CRYPTOS_LIST } from '@/constants';
import { isValidNumericInput, parseNumericInput } from '@/lib/utils';
import { usePortfolio } from '@/hooks/queries/use-portfolio';
import type { MultiselectOption } from '@telegram-apps/telegram-ui/dist/components/Form/Multiselect/types';
import {
  useCreatePercentageAlert,
  useCreatePriceAlert,
} from '@/hooks/queries/use-smart-alerts';
import { Icon28Stats } from '@telegram-apps/telegram-ui/dist/icons/28/stats'

interface IProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children: React.ReactNode;
  portfolio: IPortfolio[] | undefined;
}

export const ActiveSmartAlerts: React.FC<IProps> = ({
  isOpen,
  setIsOpen,
  children,
  portfolio,
}) => {
  const platform = usePlatform();
  const { mutate: createPercentageAlertMutation, isPending: isCreateAlertPending } = useCreatePercentageAlert();

  const [cryptoId, setCryptoId] = useState('')

  const isFormCompleted = true

  const handleSubmit = () => {

  };

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

      <Placeholder header={'Active Smart Alerts'}/>

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
        <Section
          className='!rounded-xl !overflow-hidden !bg-neutral-04 !w-full'
        >
          <Cell
            before={
              <IconContainer>
                <Icons.premium className='size-[24px] m-0.5' />
              </IconContainer>
            }
            after={<Checkbox name="checkbox" value={cryptoId}/>}
          >
            Bitcoin
          </Cell>
        </Section>

        <Button
          size='l'
          mode='filled'
          type='submit'
          disabled={!isFormCompleted}
          className='w-full'
        >
          {isCreateAlertPending ? <Spinner size='s' /> : 'Delete'}
        </Button>
      </form>
    </Modal>
  );
};
