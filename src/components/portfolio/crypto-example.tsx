import React from 'react'
import { motion } from 'framer-motion'
import { CirclePlus } from 'lucide-react'
import { Icons } from '@/components/icons'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { CardContent } from '@/components/ui/card'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { formatPrice, formatPriceWithoutDecimals } from '@/lib/utils'
import { PortfolioDetails } from '@/components/portfolio/portfolio-item-details'

interface IProps {
  onTriggerClick?: () => void
  className?: string
}

const {
  id,
  name,
  symbol,
  image,
  current_price,
  quantity,
  price_change_percentage_24h,
  total_value,
  purchase_price,
  profitLossUSD,
  profitLossPercentage,
  notice
} = {
  id: 'bitcoin',
  name: 'Bitcoin',
  symbol: 'BTC',
  image: '/bitcoin.png',
  current_price: 58203,
  quantity: 1.5,
  price_change_percentage_24h: 2.3,
  total_value: 54772,
  purchase_price: 36515,
  profitLossUSD: 32532,
  profitLossPercentage: 59.39,
  notice: 'Bought during the dip'
}

export const CryptoExample: React.FC<IProps> = ({ className, onTriggerClick }) => {

  const { t } = useTranslation()
  
  return (
    <motion.div
      className={'w-full flex flex-col justify-center -mt-10'}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.9 }}
    >
      <div className={'fixed inset-0 h-screen -mt-60 bg-background/60 opacity-75 z-40'} />

      <Accordion value={id} className={'w-full'} type={'single'}>
        <AccordionItem value={id}>
          <AccordionTrigger>
            <CardContent className={'p-0 flex w-full justify-between'}>
              <div className={'flex items-center gap-2'}>
                <Image
                  width={36}
                  height={36}
                  src={image}
                  alt={name}
                  className="h-9 w-9"
                />

                <div className="grid gap-0.5 text-left">
                  <p className="text-sm leading-none">
                    {symbol}
                  </p>
                  <p className="text-[8.5px] font-semibold text-muted-foreground truncate">
                    {name}
                  </p>
                </div>
              </div>

              <div className={'flex items-center'}>
                <div className={'mr-4'}>
                  <p
                    className={`text-sm text-foreground font-semibold  whitespace-nowrap`}>
                    {formatPrice(current_price)} $
                  </p>
                  <p
                    className={`${price_change_percentage_24h.toString().includes('-')
                      ? 'text-secondary'
                      : 'text-primary'}  text-[8.7px] text-right font-semibold`}
                  >
                    {price_change_percentage_24h.toFixed(2)} %
                  </p>
                </div>

                <div className={'w-24 mr-6'}>
                  <p
                    className={`${current_price.toString().length > 8
                      ? 'text-[13px]'
                      : 'text-sm'
                    } text-foreground font-bold text-right  whitespace-nowrap`}
                  >
                    {formatPriceWithoutDecimals(current_price * quantity)} $
                  </p>
                  <p
                    className={'text-muted-foreground text-[8.7px] text-right font-semibold'}
                  >
                    {formatPrice(quantity)} {symbol.toUpperCase()}
                  </p>
                </div>

              </div>
            </CardContent>
          </AccordionTrigger>

          <AccordionContent className={'flex gap-[13px] pl-0.5 items-start'}>
            <span className={'ml-1 flex justify-center'}>
              <Icons.edit />
            </span>

            <PortfolioDetails
              notice={notice}
              investedUSD={total_value}
              purchasePrice={purchase_price}
              profitLossUSD={profitLossUSD}
              profitLossPercentage={profitLossPercentage}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className={'relative mt-6 w-fit m-auto z-50'}>
        <div className={'flex items-center justify-center relative mb-7'}>
          <button onClick={onTriggerClick} className={'bg-background/0 animate-pulse'}>
            <CirclePlus className={'w-9 h-9 cursor-pointer text-foreground transition-colors hover:text-muted-foreground'} />
          </button>

          <span className={'absolute animate-pulse top-2 right-20'}>
            <Icons.arrowEmpty />
          </span>
        </div>

        <span className={'text-xs flex max-w-96 text-center px-5 font-medium'}>
          {t('add_crypto.add_coin_desc')}
        </span>
      </div>
    </motion.div>
  )
}
