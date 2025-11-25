import React from 'react';

export interface INavItem {
  id: string;
  label: string;
  href: string;
  key: 'market' | 'favorites' | 'pump' | 'trending' | 'dump';
  Icon: (props: IconProps) => React.JSX.Element;
}

export interface IFavorite {
  data: ICrypto[];
  favorites: string[];
}

export interface IAddCrypto {
  cryptoId: string;
  quantity: number;
  purchasePrice: number;
  notice?: string;
}

export interface IUpdatedCrypto {
  cryptoId: string;
  quantity: number;
  purchasePrice: number;
  notice?: string;
}

export interface ICryptoPaginated {
  data: ICrypto[];
  next: number;
  total: number;
}

export interface ISearchResponse {
  data: ICrypto[];
  currentPage: number;
  totalPage: number;
}

export interface IGlobalMarketData {
  active_cryptocurrencies: number;
  total_market_cap: { [key: string]: number };
  total_volume: { [key: string]: number };
  market_cap_change_percentage_24h_usd: number;
  market_cap_percentage: { btc: number };
}

export interface IPortfolioStore {
  portfolio: IPortfolio[];
  initialPortfolio: IPortfolio[];
  totalBalance: number;
  totalInvestedUSD: number;
  totalProfitLoss: number;
  totalPriceChange24h: number;
  totalProfitLossPercentage: number;
  totalPercentageChange24h: number;
  setPortfolio: (portfolio: IPortfolio[]) => void;
  calculateTotalBalance: () => void;
  calculateTotalInvestedUSD: () => void;
  calculateTotalPercentageChange24h: () => void;
  calculateTotalProfitLossPercentage: () => void;
  calculateTotalProfitLoss: () => void;
  calculateTotalPriceChange24h: () => void;
  isSorted: boolean;
  sortPortfolio: () => void;
}

export interface ICrypto {
  id: string;
  name: string;
  symbol: string;
  image: string;
  // TrendingCrypto only
  price: number;
  current_price: number;
  market_cap_rank: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
}

export interface ICryptoDetails extends ICrypto {
  markets_coin_data: IMarketsCoinData;
  markets: ICoinGlobalMarketsData[];
}

export interface ICoinGlobalMarketsData {
  exchange: string;
  volume_24h: number;
}

export interface IMarketsCoinData {
  market_cap: number;
  fdv: number;
  volume_24h: number;
  circulating_supply: number;
  total_supply: number;
  all_time_high: number;
}

export interface IPortfolio {
  cryptoId: string;
  quantity: number;
  purchasePrice: number;
  notice?: string;
  crypto: ICrypto;
}

export type IconProps = React.HTMLAttributes<SVGElement>;
