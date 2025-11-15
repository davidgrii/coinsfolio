'use client'

import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Input } from '@/shared/ui/input'
import { Search } from 'lucide-react'
import { cn } from '@/shared/ui/utils'
import { useSearchStore } from '../store'
import { useTranslation } from 'react-i18next'
import { Icons } from '../icons'

interface IProps {
  searchValue: string
  setSearchValue: (value: string) => void
  inputRef: React.RefObject<HTMLInputElement>
  className?: string
}

export const SearchInput: React.FC<IProps> = ({ searchValue, setSearchValue, inputRef, className }) => {
  const { toggleSearch } = useSearchStore()
  const { t } = useTranslation()

  const clearInput = () => {
    setSearchValue('')
    inputRef.current?.focus()
    toggleSearch(false)
  }

  return (
    <div className="flex">
      <div className={cn(className, 'relative w-full')}>
        <AnimatePresence>
          {searchValue !== undefined && (
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />

              <Input
                ref={inputRef}
                type="search"
                placeholder={t('input_search.search')}
                className="font-medium pl-8 w-full bg-[#282828] rounded-xl border-0"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />

              {searchValue && (
                <motion.button
                  className="absolute right-3 top-3"
                  onClick={clearInput}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Icons.Clear />
                </motion.button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {searchValue !== undefined && (
          <motion.span
            className="p-2.5 text-sm text-[#007BFF] font-medium cursor-pointer"
            onClick={() => clearInput()}
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            {t('input_search.cancel')}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  )
}
