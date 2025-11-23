'use client'

import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { cn } from '@/components/ui/utils'
import { useSearchStore } from '@/store'
import { useTranslation } from 'react-i18next'
import { Icons } from '@/components'
import { Input } from '@telegram-apps/telegram-ui'

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
    <div className="flex items-center">
      <div className="relative w-full">
        <Input
          status={'focused'}
          ref={inputRef}
          type="search"
          placeholder={t('input_search.search')}
          className="!-ml-5 !-mt-1"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>

      <span
        className="p-2.5 text-sm text-[#007BFF] font-medium cursor-pointer"
        onClick={() => clearInput()}
      >
        {t('input_search.cancel')}
    </span>
    </div>
  )
}
