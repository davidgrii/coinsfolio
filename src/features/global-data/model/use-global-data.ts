import { useQuery } from '@tanstack/react-query'
import { globalDataApi } from '@/features/global-data/api/api'

export const useGlobalData = () => {
  const { data, isLoading } = useQuery({
    queryKey: [globalDataApi.baseKey],
    queryFn: globalDataApi.getGlobalData,
    staleTime: 1000 * 60 * 5
  })

  return {
    globalData: data,
    isLoading
  }
}