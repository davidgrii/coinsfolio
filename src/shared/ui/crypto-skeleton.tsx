import React from 'react'
import { Skeleton } from '@/shared/ui/skeleton'
import { cn } from '@/shared/ui/utils'
import { AnimatePresence, motion } from 'framer-motion'

interface IProps {
  itemsCount: number
  className?: string
}

export const CryptoSkeleton: React.FC<IProps> = ({ itemsCount = 10, className }) => {
  return (
    <AnimatePresence>
      <motion.div
        className={cn('grid justify-start gap-8', className)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {Array.from({ length: itemsCount }).map((_, index) => (
          <div key={index} className={'flex items-center justify-center space-x-3'}>
            <Skeleton className="h-[40px] w-[40px] rounded-full" />

            <div className={'flex flex-col gap-1'}>
              <Skeleton className="h-3 w-[210px] rounded-[2px]" />
              <Skeleton className="h-2 w-[110px] rounded-[2px]" />
            </div>
          </div>
        ))}
      </motion.div>
    </AnimatePresence>
  )
}
