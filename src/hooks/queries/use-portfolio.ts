import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { BASE_URL } from '@/constants'
import type { IPortfolio } from '@/types'

export const usePortfolio = (userId: string): UseQueryResult<IPortfolio[], Error> => {
 return useQuery({
    queryKey: ['portfolio', userId],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/api/users/${userId}/portfolio`)

      if (!res.ok) {
        throw new Error('Ошибка при получении портфолио: ' + res.statusText)
      }

      return await res.json()
    },
    select: (result) => result.data,
    enabled: !!userId
  })
}