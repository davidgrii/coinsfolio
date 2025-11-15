import { useMutation, useQueryClient } from '@tanstack/react-query'
import { portfolioApi } from '@/features/portfolio/api/api'
import { IAddCrypto } from '@/features/portfolio/types/portfolio.types'

export const useAddCrypto = () => {
  const queryClient = useQueryClient()

  const addCryptoPortfolioMutation = useMutation({
    mutationFn: ({ userId, data }: { userId: string, data: IAddCrypto }) =>
      portfolioApi.addCrypto(userId, data),
    async onSuccess(_, { userId }) {
      await queryClient.invalidateQueries({
        queryKey: [portfolioApi.baseKey, userId]
      })
    }
  })

  return {
    handleAdd: addCryptoPortfolioMutation.mutate,
    isPending: addCryptoPortfolioMutation.isPending
  }
}