import { INavItems } from '@/types'
import { Icons } from '@/components/icons'

export const CATEGORIES_NAV_ITEMS: INavItems[] = [
  {
    id: 'market',
    label: 'Market',
    href: '/market',
    exact: false,
    active: true,
    key: 'market',
  },
  // {
  //   id: 'favorites',
  //   label: 'Favorites',
  //   href: '/favorites',
  //   exact: false,
  //   active: true,
  //   key: 'favorites',
  //   Icon: Icons.Favorites
  // },
  {
    id: 'trending',
    label: 'Trending',
    href: '/trending',
    exact: false,
    active: true,
    key: 'trending',
  },
  {
    id: 'pump',
    label: 'Pump',
    href: '/pump',
    exact: false,
    active: true,
    key: 'pump',
  },
  {
    id: 'dump',
    label: 'Dump',
    href: '/dump',
    exact: false,
    active: true,
    key: 'dump',
  }
]

export const APP_NAV_ITEMS = [
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