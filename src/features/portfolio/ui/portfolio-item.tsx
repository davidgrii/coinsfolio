import { CardContent } from '@/shared/ui/card'
import { formatPrice, formatPriceWithoutDecimals } from '@/shared/utils/formatters'
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/shared/ui/accordion'
import React, { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { PortfolioItemConfirm, PortfolioItemDetails, PortfolioItemEdit } from '@/features/portfolio'
import { IPortfolioItem } from '@/types'

interface IProps {
  item: IPortfolioItem
  onEdit: (_id: string) => void
  onDelete: (id: string) => void
}

export const PortfolioItem: React.FC<IProps> = ({ item, onEdit, onDelete }) => {

  const [open, setOpen] = useState(false)

  if (!item || !item.crypto) {
    return null
  }

  const currentPrice = item?.crypto.current_price
  const quantity = item.quantity
  const purchasePrice = item.purchasePrice

  const investedUSD = quantity * purchasePrice
  const currentInvestmentValue = currentPrice * quantity
  const profitLossUSD = currentInvestmentValue - investedUSD
  const profitLossPercentage = ((currentPrice - purchasePrice) / purchasePrice) * 100

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <AccordionItem value={item.cryptoId}>
        <AccordionTrigger>
          <CardContent className={'p-0 flex w-full justify-between'}>
            <div className={'flex items-center gap-2'}>
              <Image
                width={36}
                height={36}
                src={item.crypto.image}
                alt={item.crypto.name}
                className="h-9 w-9"
              />

              <div className="grid gap-0.5 text-left">
                <p className="text-sm leading-none">
                  {item.crypto.symbol?.toUpperCase()}
                </p>
                <p className="text-[8.5px] font-semibold text-muted-foreground truncate">
                  {item.crypto?.name}
                </p>
              </div>
            </div>

            <div className={'flex items-center'}>
              <div className={'mr-4'}>
                <p
                  className={`text-sm text-foreground font-semibold  whitespace-nowrap`}>
                  {formatPrice(currentPrice)} $
                </p>
                <p
                  className={`${item.crypto.price_change_percentage_24h.toString().includes('-')
                    ? 'text-secondary'
                    : 'text-primary'}  text-[8.7px] text-right font-semibold`}
                >
                  {item.crypto.price_change_percentage_24h.toFixed(2)} %
                </p>
              </div>

              <div className={'w-24 mr-6'}>
                <p
                  className={`${item.crypto.current_price.toString().length > 8
                    ? 'text-[13px]'
                    : 'text-sm'
                  } text-foreground font-bold text-right  whitespace-nowrap`}
                >
                  {formatPriceWithoutDecimals(item.crypto.current_price * item.quantity)} $
                </p>
                <p
                  className={'text-muted-foreground text-[8.7px] text-right font-semibold'}
                >
                  {formatPrice(quantity)} {item.crypto.symbol.toUpperCase()}
                </p>
              </div>

            </div>
          </CardContent>
        </AccordionTrigger>

        <AccordionContent className={'flex gap-2.5 pl-0.5 items-start'}>
          <PortfolioItemEdit
            open={open}
            setOpen={setOpen}
            onEdit={onEdit}
            itemId={item.cryptoId}
          />

          <PortfolioItemConfirm
            open={open}
            setOpen={setOpen}
            itemId={item.cryptoId}
            onDelete={onDelete}
          />

          <PortfolioItemDetails
            notice={item.notice}
            investedUSD={investedUSD}
            purchasePrice={purchasePrice}
            profitLossUSD={profitLossUSD}
            profitLossPercentage={profitLossPercentage}
          />
        </AccordionContent>
      </AccordionItem>
    </motion.div>
  )
}
