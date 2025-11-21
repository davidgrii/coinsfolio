'use client'

import React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { APP_NAV_ITEMS } from '@/constants'
import { Tabbar } from '@telegram-apps/telegram-ui'

type TranslationKey =  "market" | "portfolio"

export const AppMenu = () => {
  const currentPage = usePathname()
  const router = useRouter()

  const { t } = useTranslation()

  const handleNavClick = (href: string) => {
    router.push(href)
  }

  return (
    <>

      <Tabbar>
        {APP_NAV_ITEMS.map(({ id, label, href, Icon }) =>
          <Tabbar.Item  key={id} text={t(label as TranslationKey)} selected={href === currentPage} onClick={() => handleNavClick(href)}
        >
          <Icon />
        </Tabbar.Item>)}
      </Tabbar>
    </>

  )
}

