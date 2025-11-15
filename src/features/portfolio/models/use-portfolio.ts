import { useQuery } from '@tanstack/react-query'
import { portfolioApi } from '@/features/portfolio/api/api'
import { IPortfolioItem } from '@/types'

export const usePortfolio = (userId: string) => {
  const { data, isLoading } = useQuery({
    queryKey: [portfolioApi.baseKey, userId],
    queryFn: () => portfolioApi.getPortfolio(userId),
    enabled: !!userId
  })

  const portfolioData: IPortfolioItem[] = data || []

  return {
    portfolioData,
    isLoading
  }
}