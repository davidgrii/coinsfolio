import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Icons } from '@/components/icons'

interface IProps {
  onSort: () => void
}

export const BalanceTableHeader = ({ onSort }: IProps) => {
  const [isSorted, setIsSorted] = useState(false)

  const { t } = useTranslation()

  const handleSort = async () => {
    onSort()
    setIsSorted(!isSorted)
  }

  return (
    <div className={'flex justify-between text-[12.5px] font-medium text-neutral-03 mt-3 mb-4'}>
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
          <Icons.sortedPortfolio />
        </motion.span>
      </div>
    </div>
  )
}
