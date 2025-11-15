import { useQuery } from '@tanstack/react-query'
import { trendingApi } from '@/features/trending/api/api'

export const useTrendingData = () => {
  const { data, isLoading } = useQuery({
    queryKey: [trendingApi.baseKey],
    queryFn: trendingApi.getTrendingData,
    staleTime: 1000 * 60 * 5
  })

  const trendingCrypto = data || []

  return {
    trendingCrypto,
    isLoading
  }
}