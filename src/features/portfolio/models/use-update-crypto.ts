import { useMutation, useQueryClient } from '@tanstack/react-query'
import { portfolioApi } from '@/features/portfolio/api/api'
import { IUpdatedCrypto } from '@/features/portfolio/types/portfolio.types'

export const useUpdateCrypto = () => {
  const queryClient = useQueryClient()

  const updateCryptoPortfolioMutation = useMutation({
    mutationFn: ({ userId, updatedData }: {
      userId: string,
      updatedData: IUpdatedCrypto
    }) => portfolioApi.updateCrypto(userId, updatedData),
    async onSuccess(_, { userId }) {
      await queryClient.invalidateQueries({
        queryKey: [portfolioApi.baseKey, userId]
      })
    }
  })

  return {
    handleUpdate: updateCryptoPortfolioMutation.mutate,
    isPending: updateCryptoPortfolioMutation.isPending
  }
}