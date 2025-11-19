'use client'

import React from 'react'
import { cn } from '@/components/ui/utils'
import { usePathname, useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { APP_NAV_ITEMS } from '@/constants'

type TranslationKey =  "market" | "portfolio"

export const AppMenu = () => {
  const currentPage = usePathname()
  const router = useRouter()

  const { t } = useTranslation()

  const handleNavClick = (id: string, href: string) => {
    router.push(href)
  }

  return (
    <>
      <div className={'flex z-50 justify-center bg-background w-full fixed bottom-0 left-0'}>
        <div className={'flex justify-items-stretch text-nowrap w-full px-4'}>
          {APP_NAV_ITEMS.map(({ id, label, href, Icon }) => (
            <button
              key={id}
              onClick={() => handleNavClick(id, href)}
              className={cn('flex flex-col justify-center relative items-center flex-1 gap-1 max-w-full p-4 pb-8 text-muted-foreground font-semibold transition duration-150 ease-out hover:opacity-80',
                currentPage === href && 'text-foreground')
              }
            >
              <Icon />
              <span className={'text-xs'}>{t(label as TranslationKey)}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  )
}

