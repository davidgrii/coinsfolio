import { ITrendingCrypto } from '@/types'

const BASE_URL = process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL

export const trendingApi = {
  baseKey: 'trending',

  getTrendingData: async (): Promise<ITrendingCrypto[]> => {
    const res = await fetch(`${BASE_URL}/api/trending`)

    if (!res.ok) {
      throw new Error('Ошибка при загрузке данных')
    }

    return await res.json()
  }
}