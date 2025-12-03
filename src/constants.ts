import { INavItem } from '@/types';
import { Icons } from '@/components/icons';

export const BINANCE_REF_URL = 'https://accounts.binance.com/register?ref=1021567637'

export const EXCHANGE_REF_URLS = [
  {
    label: 'Binance',
    url: 'https://accounts.binance.com/register?ref=1021567637'
  },
  {
    label: 'Bybit',
    url: 'https://www.bybit.com/en'
  },
  {
    label: 'OKX',
    url: 'https://www.okx.com'
  },
  {
    label: 'KuCoin',
    url: 'https://www.kucoin.com'
  },
  {
    label: 'BitGet',
    url: 'https://www.bitget.com/en'
  },
  {
    label: 'CoinBase',
    url: 'https://www.coinbase.com'
  },
] as const

export const COINGEKO_URL = 'https://www.coingecko.com/en/coins'

export const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_PROD_BACKEND_URL
    : process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL;

export const CATEGORIES_NAV_ITEMS: INavItem[] = [
  {
    id: 'favorites',
    label: 'Favorites',
    href: '/favorites',
    key: 'favorites',
    Icon: Icons.favorites,
  },
  {
    id: 'trending',
    label: 'Trending',
    href: '/trending',
    key: 'trending',
    Icon: Icons.trending,
  },
  {
    id: 'pump',
    label: 'Pump',
    href: '/pump',
    key: 'pump',
    Icon: Icons.pump,
  },
  {
    id: 'dump',
    label: 'Dump',
    href: '/dump',
    key: 'dump',
    Icon: Icons.dump,
  },
];

export const APP_NAV_ITEMS = [
  {
    id: 'market',
    label: 'Market',
    href: '/market',
    key: 'market',
    Icon: Icons.market,
  },
  {
    id: 'portfolio',
    label: 'Portfolio',
    href: '/portfolio',
    key: 'portfolio',
    Icon: Icons.portfolio,
  },
  {
    id: 'settings',
    label: 'Settings',
    href: '/',
    key: 'settings',
    Icon: Icons.settings,
  },
];

//  ANIMATIONS

export const ANIMATE_CRYPTOS_LIST = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.7 }
}