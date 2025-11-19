'use client'

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import { CATEGORIES_NAV_ITEMS } from '@/constants'
import { usePathname } from 'next/navigation'
import { cn } from '@/components/ui/utils'
import { useTranslation } from 'react-i18next'

interface IProps {
  className?: string
}

export const Categories: React.FC<IProps> = ({ className }) => {
  const { t } = useTranslation()
  const currentPage = usePathname()
  const categoryRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const currentCategoryIndex = CATEGORIES_NAV_ITEMS.findIndex(item => item.href === currentPage)
    if (currentCategoryIndex !== -1 && categoryRefs.current[currentCategoryIndex] && containerRef.current) {
      const activeCategory = categoryRefs.current[currentCategoryIndex]
      const container = containerRef.current

      const activeCategoryLeft = activeCategory?.offsetLeft
      const activeCategoryWidth = activeCategory?.offsetWidth
      const containerWidth = container?.clientWidth

      const scrollPosition = activeCategoryLeft - containerWidth / 2 + activeCategoryWidth / 2

      container.scrollTo({
        left: scrollPosition,
        behavior: 'auto'
      })
    }
  }, [currentPage])

  return (
    <div ref={containerRef} className="overflow-x-auto select-none">
      <div className={cn('flex flex-row gap-1.5 text-sm mb-2.5  whitespace-nowrap', className)}>
        {CATEGORIES_NAV_ITEMS.map((item, index) => (
          <Link
            ref={el => { categoryRefs.current[index] = el }}
            key={index}
            href={item.href}
            className={cn(
              currentPage === item.href ? 'bg-foreground text-background' : 'bg-background',
              !item.active && 'opacity-45 cursor-not-allowed',
              'flex items-center gap-1.5 px-6 py-2 font-bold rounded-lg border h-10'
            )}
          >
            {t(`CATEGORIES_NAV_ITEMS.${item.key}`)}
          </Link>
        ))}
      </div>
    </div>
  )
}
