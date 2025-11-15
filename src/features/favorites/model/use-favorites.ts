import { useQuery } from '@tanstack/react-query'
import { favoritesApi } from '@/features/favorites/api/api'

export const useFavorites = (userId: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ['favorites', userId],
    queryFn: () => favoritesApi.getFavorites(userId),
    staleTime: 3 * 60 * 1000,
    enabled: !!userId
  })

  const favorites = data?.favorites || []
  const cryptoData = data?.data || []

  return {
    favorites,
    cryptoData,
    isLoading
  }
}