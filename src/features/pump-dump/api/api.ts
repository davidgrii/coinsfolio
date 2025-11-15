import { ICrypto } from '@/types'

const BASE_URL = process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL

export const pumpDumpApi = {
  baseKeyPump: 'pump',
  baseKeyDump: 'dump',

  getCryptosPump: async (): Promise<ICrypto[]> => {
    const res = await fetch(`${BASE_URL}/api/pumpdump`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        type: 'pump',
        limit: 50
      })
    })

    if (!res.ok) {
      throw new Error('Ошибка при получении Dump данных: ' + res.statusText)
    }

    return await res.json()
  },

  getCryptosDump: async (): Promise<ICrypto[]> => {
    const res = await fetch(`${BASE_URL}/api/pumpdump`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        type: 'dump',
        limit: 50
      })
    })

    if (!res.ok) {
      throw new Error('Ошибка при получении Dump данных: ' + res.statusText)
    }

    return await res.json()
  }
}