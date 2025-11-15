import React from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Icons } from '@/shared/icons/icons'
import { usePortfolioStore } from '@/shared/store'

export const BalanceTableHeader = () => {

  const { t } = useTranslation()

  const { sortPortfolio, isSorted } = usePortfolioStore()

  const handleSort = async () => {
    sortPortfolio()
  }

  return (
    <div className={'flex justify-between text-[12.5px] font-medium text-muted-foreground mt-3'}>
      <h2>{t('balance_table_header.coin')}</h2>

      <div className={'flex'}>
        <div className={'flex gap-8 mr-5'}>
          <span>
            {t('balance_table_header.price')}
          </span>
          <span className={'w-20 text-right'}>
            {t('balance_table_header.value')}
          </span>
        </div>

        <motion.span
          className="cursor-pointer flex items-center p-2 -m-2"
          initial={{ rotate: 0 }}
          animate={{ rotate: isSorted ? 0 : 180 }}
          transition={{ duration: 0.3 }}
          onClick={handleSort}
        >
          <Icons.SortedPortfolio />
        </motion.span>
      </div>
    </div>
  )
}
