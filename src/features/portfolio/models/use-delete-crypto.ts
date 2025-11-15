import { useMutation, useQueryClient } from '@tanstack/react-query'
import { portfolioApi } from '@/features/portfolio/api/api'

export const useDeleteCrypto = () => {
  const queryClient = useQueryClient()

  const deleteCryptoPortfolioMutation = useMutation({
    mutationFn: ({ userId, cryptoId }: { userId: string, cryptoId: string }) =>
      portfolioApi.deleteCrypto(userId, cryptoId),
    async onSuccess(_, { userId }) {
      await queryClient.invalidateQueries({
        queryKey: [portfolioApi.baseKey, userId]
      })
    }
  })

  return {
    handleDelete: deleteCryptoPortfolioMutation.mutate,
    isPending: deleteCryptoPortfolioMutation.isPending
  }
}