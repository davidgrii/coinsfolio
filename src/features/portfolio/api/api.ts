import { IAddCrypto, IUpdatedCrypto } from '@/features/portfolio/types/portfolio.types'
import { IPortfolioItem } from '@/types'

const BASE_URL = process.env.NODE_ENV === "production"
  ? process.env.NEXT_PUBLIC_PROD_BACKEND_URL
  : process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL;

export const portfolioApi = {
  baseKey: 'portfolio',

  getPortfolio: async (userId: string): Promise<IPortfolioItem[]> => {
    const res = await fetch(`${BASE_URL}/api/users/${userId}/portfolio`)

    if (!res.ok) {
      throw new Error('Ошибка при получении портфолио: ' + res.statusText)
    }

    const { data } = await res.json()

    return data
  },

  addCrypto: async (userId: string, addData: IAddCrypto): Promise<void> => {
    const { cryptoId, purchasePrice, quantity, notice } = addData

    const res = await fetch(`${BASE_URL}/api/users/${userId}/portfolio`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        purchasePrice,
        cryptoId,
        quantity,
        notice
      })
    })

    if (!res.ok) {
      throw new Error('Ошибка при добавлении криптовалюты в портфолио: ' + res.statusText)
    }
  },

  updateCrypto: async (userId: string, updatedData: IUpdatedCrypto): Promise<void> => {
    const { cryptoId, purchasePrice, quantity, notice } = updatedData

    const res = await fetch(`${BASE_URL}/api/users/${userId}/portfolio`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        purchasePrice,
        cryptoId,
        quantity,
        notice
      })
    })

    if (!res.ok) {
      throw new Error('Ошибка при редактировании криптовалюты в портфолио: ' + res.statusText)
    }
  },

  deleteCrypto: async (userId: string, cryptoId: string): Promise<void> => {
    const res = await fetch(`${BASE_URL}/api/users/${userId}/portfolio`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ cryptoId })
    })

    if (!res.ok) {
      throw new Error('Ошибка при удалении криптовалюты из портфолио: ' + res.statusText)
    }
  }
}