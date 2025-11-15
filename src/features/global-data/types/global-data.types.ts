export interface IGlobalMarketData {
  active_cryptocurrencies: number
  total_market_cap?: { [key: string]: number }
  total_volume: { [key: string]: number }
  market_cap_change_percentage_24h_usd: number
  market_cap_percentage: { btc: number }
}