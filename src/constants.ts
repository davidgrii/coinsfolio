import { INavItems } from '@/types'

export const CATEGORIES_NAV_ITEMS: INavItems[] = [
  {
    label: 'Market',
    href: '/market',
    exact: false,
    active: true,
    key: 'market'
  },
  {
    label: 'Favorites',
    href: '/favorites',
    exact: false,
    active: true,
    key: 'favorites'
  },
  {
    label: 'Trending',
    href: '/trending',
    exact: false,
    active: true,
    key: 'trending'
  },
  {
    label: 'Pump',
    href: '/pump',
    exact: false,
    active: true,
    key: 'pump'
  },
  {
    label: 'Dump',
    href: '/dump',
    exact: false,
    active: true,
    key: 'dump'
  }
]