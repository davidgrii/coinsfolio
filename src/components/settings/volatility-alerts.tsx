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

export const VolatilityAlerts: React.FC<IProps> = (
  {
    children
  }) => {
  const [percentage, setPercentage] = useState(5)

  const platform = usePlatform()
  const { t } = useTranslation()
  const { data: portfolio, isLoading: isLoadingPortfolio } = usePortfolio()

  const portfolioOptions = portfolio?.map((item, index) => ({
    name: item.crypto.name,
    symbol: item.crypto.symbol
  })) || []

  const isFormCompleted = false

  const handleChangePercentage = (value: number) => {
    setPercentage(value)
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

      <Placeholder header={'Volatility Alerts'} />

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
            <option>Volatility (1m) — {percentage}%</option>
            <option>Volatility (5m) — {percentage}%</option>
            <option>Volatility (10m) — {percentage}%</option>
            <option>Volatility (1h) — {percentage}%</option>
          </Select>
        </div>

        <div className="w-full relative">
            <Slider
              step={1}
              min={1}
              max={20}
              defaultValue={percentage}
              onChange={handleChangePercentage}
              className="!bg-neutral-04 rounded-xl"
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
