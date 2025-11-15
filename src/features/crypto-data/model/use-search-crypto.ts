import { useQuery } from '@tanstack/react-query'
import { cryptoDataApi, ISearchResponse } from '@/features/crypto-data/api/api'

export const useSearchCrypto = (query: string) => {
  const { data, isLoading } = useQuery({
    queryKey: [cryptoDataApi.baseKey, 'search', query],
    queryFn: () => cryptoDataApi.searchCryptoData(query),
    select: (result: ISearchResponse) => result.data,
    staleTime: 3 * 60 * 1000,
    enabled: !!query
  })

  const searchResults = data || []

  return {
    searchResults,
    isLoading
  }
}