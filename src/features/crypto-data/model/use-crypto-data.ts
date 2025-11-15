import { useInfiniteQuery } from '@tanstack/react-query'
import { cryptoDataApi, ICryptoResponse } from '@/features/crypto-data/api/api'

export const useCryptoData = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
    queryKey: [cryptoDataApi.baseKey],
    queryFn: ({ pageParam }: { pageParam: number }) => cryptoDataApi.getCryptoData(pageParam),
    staleTime: 3 * 60 * 1000,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.next,
    select: (result) => result.pages.flatMap((page: ICryptoResponse) => page.data),
  })

  const cryptoData = data || []

  return {
    isLoading,
    cryptoData,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
  }
}