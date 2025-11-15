import { ICrypto } from '@/types'

const BASE_URL = process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL

export interface ICryptoResponse {
  data: ICrypto[]
  next: number
  total: number
}

export interface ISearchResponse {
  data: ICrypto[]
  currentPage: number
  totalPage: number
}

export const cryptoDataApi = {
  baseKey: 'cryptoData',

  getCryptoData: async (pageParam = 1, limit = 50): Promise<ICryptoResponse> => {
    const res = await fetch(`${BASE_URL}/api/cryptos?page=${pageParam}&limit=${limit}`)

    if (!res.ok) {
      throw new Error('Ошибка при загрузке данных')
    }

    return await res.json()
  },

  searchCryptoData: async (query: string, pageParam = 1, limit = 20): Promise<ISearchResponse> => {
    const res = await fetch(`${BASE_URL}/api/cryptos/search?q=${query}&page=${pageParam}&limit=${limit}`)

    if (!res.ok) {
      throw new Error('Ошибка при поиске криптовалюты')
    }

    return await res.json()
  },
}