'use client'

import React, { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Icons } from '@/shared/icons'
import { useTranslation } from 'react-i18next'
import { cn } from '@/shared/ui/utils'
import { Gift } from '@/widgets/main-nav/_ui/gift'

type TranslationKey =  "market" | "portfolio" | "friends"

const NAV_ITEMS = [
  {
    label: 'Market',
    href: '/market',
    exact: false,
    active: true,
    id: 'market',
    Icon: Icons.Market
  },
  {
    label: 'Favorites',
    href: '/favorites',
    exact: false,
    active: true,
    id: 'favorites',
    Icon: Icons.Favorites
  },
  {
    label: 'Portfolio',
    href: '/portfolio',
    exact: false,
    active: true,
    id: 'portfolio',
    Icon: Icons.Portfolio
  },
]

export const Navbar = () => {
  const [show, setShow] = useState(false)

  const currentPage = usePathname()
  const router = useRouter()

  const { t } = useTranslation()

  const handleNavClick = (id: string, href: string) => {
    router.push(href)
  }

  return (
    <div className={'flex justify-items-stretch text-nowrap w-full px-4'}>
      {NAV_ITEMS.map(({ id, label, href, Icon }) => (
        <button
          key={id}
          onClick={() => handleNavClick(id, href)}
          className={cn('flex flex-col justify-center relative items-center flex-1 gap-1 max-w-full p-4 pb-8 text-muted-foreground font-semibold transition duration-150 ease-out hover:opacity-80',
            currentPage === href && 'text-foreground')
          }
        >
          {label === 'Friends' && show &&
            <Gift
              show={show}
              setShow={setShow}
              currentPage={currentPage}
            />
          }
          <Icon />
          <span className={'text-xs'}>{t(label as TranslationKey)}</span>
        </button>
      ))}
    </div>
  )
}
