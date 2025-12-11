import React from 'react';

export interface IUser {
  first_name: string;
  id: number;
  is_bot?: boolean | undefined;
  is_premium?: boolean | undefined;
  last_name?: string | undefined;
  language_code?: string | undefined;
  photo_url?: string | undefined;
  username?: string | undefined;
}

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
  coin_market_stats: IMarketsCoinData;
  exchanges: ICoinGlobalMarketsData[];
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

export interface ISmartAlert {
  id: string;
  userId: number;
  price_alerts: IPriceAlert[];
  percentage_alerts: IPercentageAlert[];
  volatility_alerts: IVolatilityAlert[];

  createdAt?: Date;
  updatedAt?: Date;
}

export interface IPriceAlert {
  id: string;
  cryptoId: string;
  condition_type: ConditionType;
  price: string;
}

export interface IPercentageAlert {
  id: string;
  cryptoId: string;
  condition_type: ConditionType;
  percentage: string;
}

export interface IVolatilityAlert {
  id: string;
  cryptoId: string;
  condition_type: '1m' | '5m' | '10m' | '1h';
  percentage: string;
}

export type ConditionType = 'above' | 'below';
export type IconProps = React.HTMLAttributes<SVGElement>;
