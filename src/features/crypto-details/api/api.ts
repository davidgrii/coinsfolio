import { ICryptoDetails } from '@/types'

const BASE_URL = process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL

export const cryptoByIdApi = {
  baseKey: 'cryptoDetails',

  getCryptoById: async (cryptoId: string | null): Promise<ICryptoDetails> => {
    const res = await fetch(`${BASE_URL}/api/cryptos/${cryptoId}`)

    if (!res.ok) {
      throw new Error('Ошибка при получении криптовалюты')
    }

    return await res.json()
  },
}