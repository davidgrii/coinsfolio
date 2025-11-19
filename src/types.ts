export interface INavItems {
  label: string
  href: string
  exact: boolean
  active: boolean
  key: 'market' | 'favorites' | 'pump' | 'trending' | 'dump'
}

export interface IPortfolioStore {
  portfolio: IPortfolioItem[]
  initialPortfolio: IPortfolioItem[]
  totalBalance: number
  totalInvestedUSD: number
  totalProfitLoss: number
  totalPriceChange24h: number
  totalProfitLossPercentage: number
  totalPercentageChange24h: number
  setPortfolio: (portfolio: IPortfolioItem[]) => void
  calculateTotalBalance: () => void
  calculateTotalInvestedUSD: () => void
  calculateTotalPercentageChange24h: () => void
  calculateTotalProfitLossPercentage: () => void
  calculateTotalProfitLoss: () => void
  calculateTotalPriceChange24h: () => void
  isSorted: boolean
  sortPortfolio: () => void
}

export interface ICrypto {
  id: string
  name: string
  symbol: string
  image: string
  current_price: number
  market_cap_rank: number
  price_change_24h: number
  price_change_percentage_24h: number
}

export interface ICoinGlobalMarketsData {
  exchange: string
  volume_24h: number
}

export interface IMarketsCoinData {
  market_cap: number
  fdv: number
  volume_24h: number
  circulating_supply: number
  total_supply: number
  all_time_high: number
}

export interface ICryptoDetails {
  markets_coin_data: IMarketsCoinData
  markets: ICoinGlobalMarketsData[]
}

export interface ITrendingCrypto extends ICrypto {
  price: number
  market_cap_rank: number
  price_change_percentage_24h_usd: number
}

export interface IPortfolioItem {
  cryptoId: string
  quantity: number
  purchasePrice: number
  notice?: string
  crypto: ICrypto
}
