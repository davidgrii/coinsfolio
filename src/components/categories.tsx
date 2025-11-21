'use client'

import React from 'react'
import { CATEGORIES_NAV_ITEMS } from '@/constants'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { InlineButtons } from '@telegram-apps/telegram-ui'
import {
  InlineButtonsItem
} from '@telegram-apps/telegram-ui/dist/components/Blocks/InlineButtons/components/InlineButtonsItem/InlineButtonsItem'

export const Categories = () => {
  const { t } = useTranslation()
  const router = useRouter()

  const handleClick = (href: string) => {
    router.push(href)
  }

  return (
    <>
      <InlineButtons mode='gray'>
        {CATEGORIES_NAV_ITEMS.map(({ id, label, href, key }) => (
          <InlineButtonsItem onClick={() => handleClick(href)} key={id} text={t(`CATEGORIES_NAV_ITEMS.${key}`)}/>
        ))}
      </InlineButtons>
    </>
  )
}
