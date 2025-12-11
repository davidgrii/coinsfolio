import { motion } from 'framer-motion'
import { ANIMATE_CRYPTOS_LIST } from '@/constants'
import React, { type PropsWithChildren } from 'react'
import { List } from '@telegram-apps/telegram-ui'

export const CryptoList = ({ children }: PropsWithChildren) => {
  return (
    <motion.div
      initial={ANIMATE_CRYPTOS_LIST.initial}
      animate={ANIMATE_CRYPTOS_LIST.animate}
      exit={ANIMATE_CRYPTOS_LIST.exit}
      transition={ANIMATE_CRYPTOS_LIST.transition}
    >
      <List
        className='grid gap-2 overflow-y-auto overflow-x-hidden max-h-[70vh] !pb-[80px] scrollbar-none !pt-0 !px-0'
      >
        {children}
      </List>
    </motion.div>
  )
}