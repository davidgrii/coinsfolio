import { ICrypto } from '@/types'

export interface IFavoritesCrypto {
  data: ICrypto[],
  favorites: string[]
}

const BASE_URL = process.env.NODE_ENV === "production"
  ? process.env.NEXT_PUBLIC_PROD_BACKEND_URL
  : process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL;

export const favoritesApi = {
  baseKey: 'favorites',
  getFavorites: async (userId: string): Promise<IFavoritesCrypto> => {
    const res = await fetch(`${BASE_URL}/api/users/${userId}/favorites`)

    if (!res.ok) {
      throw new Error('Ошибка при загрузке данных')
    }

    return await res.json()
  },

  addFavorite: async (userId: string, cryptoId: string): Promise<void> => {
    const res = await fetch(`${BASE_URL}/api/users/${userId}/favorites`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ cryptoId })
    })

    if (!res.ok) {
      throw new Error(`Ошибка добавления в избранное: ${res.statusText}`)
    }
  },

  deleteFavorite: async (userId: string, cryptoId: string): Promise<void> => {
    const res = await fetch(`${BASE_URL}/api/users/${userId}/favorites`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ cryptoId })
    })

    if (!res.ok) {
      throw new Error(`Ошибка удаления из избранного: ${res.statusText}`)
    }
  }
}