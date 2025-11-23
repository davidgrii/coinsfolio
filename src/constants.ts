import { INavItem } from '@/types'
import { Icons } from '@/components/icons'

export const BASE_URL = process.env.NODE_ENV === "production"
  ? process.env.NEXT_PUBLIC_PROD_BACKEND_URL
  : process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL;

export const CATEGORIES_NAV_ITEMS: INavItem[] = [
  {
    id: 'favorites',
    label: 'Favorites',
    href: '/favorites',
    key: 'favorites',
    Icon: Icons.favorites
  },
  {
    id: 'trending',
    label: 'Trending',
    href: '/trending',
    key: 'trending',
    Icon: Icons.trending
  },
  {
    id: 'pump',
    label: 'Pump',
    href: '/pump',
    key: 'pump',
    Icon: Icons.pump
  },
  {
    id: 'dump',
    label: 'Dump',
    href: '/dump',
    key: 'dump',
    Icon: Icons.dump
  }
]

export const APP_NAV_ITEMS = [
  {
    id: 'market',
    label: 'Market',
    href: '/market',
    key: 'market',
    Icon: Icons.market
  },
  {
    id: 'portfolio',
    label: 'Portfolio',
    href: '/portfolio',
    key: 'portfolio',
    Icon: Icons.portfolio
  },
  {
    id: 'settings',
    label: 'Settings',
    href: '/',
    key: 'settings',
    Icon: Icons.settings
  },
]