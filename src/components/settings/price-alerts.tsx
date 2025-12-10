import React, { type ChangeEvent, useMemo, useState } from 'react'
import { CirclePlus } from 'lucide-react'
import { ICrypto } from '@/types'
import { useTranslation } from 'react-i18next'
import { Icons } from '@/components/icons'
import {
  Avatar,
  Button,
  Divider,
  FixedLayout,
  Input,
  Modal, Multiselect,
  Placeholder, Section, Select, Slider,
  Tappable, Textarea, VisuallyHidden
} from '@telegram-apps/telegram-ui'
import {
  ModalHeader
} from '@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader'
import { useSearchCrypto } from '@/hooks/queries/use-crypto'
import { motion } from 'framer-motion'
import { useDebounceValue } from 'usehooks-ts'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/components/ui/utils'
import { usePlatform } from '@/hooks/use-platfrom'
import { DialogTitle } from '@radix-ui/react-dialog'
import { ANIMATE_CRYPTOS_LIST } from '@/constants'
import { isValidNumericInput, parseNumericInput } from '@/lib/utils'
import { usePortfolio } from '@/hooks/queries/use-portfolio'
import type { MultiselectOption } from '@telegram-apps/telegram-ui/dist/components/Form/Multiselect/types'

interface IProps {
  children: React.ReactNode;
}

export const PriceAlerts: React.FC<IProps> = (
  {
    children
  }) => {
  const [price, setPrice] = useState('')

  const platform = usePlatform()
  const { t } = useTranslation()
  const { data: portfolio, isLoading: isLoadingPortfolio } = usePortfolio()


  const portfolioOptions = portfolio?.map((item, index) => ({
    name: item.crypto.name,
    symbol: item.crypto.symbol
  })) || []

  const isFormCompleted = false

  const handleChangePrice = (e: ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value)
  }

  const handleSubmit = () => {

  }

  return (
    <Modal
      header={<ModalHeader />}
      trigger={children}
      className="!bg-base-background backdrop-blur-lg !z-50 shadow-[0_0_0_2px_rgba(255,255,255,0.1)]"
    >
      <VisuallyHidden>
        <DialogTitle>
          Add Portfolio Modal
        </DialogTitle>
      </VisuallyHidden>

      <Placeholder header={'Price Alerts'} />

      <form className="w-full flex flex-col gap-6 items-center justify-between px-3 pb-3">
        <div className="w-full relative">
          <Select
            className="!bg-neutral-04"
          >
            {portfolioOptions.map(({ name, symbol }, index) => (
              <option key={index}>{name} - ({symbol.toUpperCase()})</option>
            ))}
          </Select>
        </div>

        <div className="w-full relative">
          <Select className="!bg-neutral-04">
            <option>Price Above (X)</option>
            <option>Price Below (X)</option>
          </Select>
        </div>

        <div className="w-full relative">
          <Input
            type="text"
            placeholder="Price"
            value={price}
            onChange={handleChangePrice}
            after={price ? (
              <Tappable
                Component="button"
                className="bg-neutral-04 rounded-full"
                onClick={() => setPrice('')}
              >
                <Icons.close />
              </Tappable>
            ) : (
              <Icons.question
                onClick={() => alert('Enter following crypto price Example: 123,450.32 or 0.00213')}
                className="size-5 mr-0.5 text-neutral-03 cursor-pointer duration-200 transition-opacity ease-out hover:opacity-80"
              />
            )}
            className="!bg-neutral-04"
          />
        </div>

        <Button
          size="l"
          mode="filled"
          disabled={!isFormCompleted}
          onClick={handleSubmit}
          className="w-full"
        >
          Save
        </Button>
      </form>
    </Modal>
  )
}
