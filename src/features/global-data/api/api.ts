import { IGlobalMarketData } from '@/features/global-data'

const BASE_URL = process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL

export const globalDataApi = {
  baseKey: 'globalData',

  getGlobalData: async (): Promise<IGlobalMarketData> => {
    const res = await fetch(`${BASE_URL}/api/global`)

    if (!res.ok) {
      throw new Error('Ошибка при получении данных: ' + res.statusText)
    }

    const { data } = await res.json()

    return data
  }
}