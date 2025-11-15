import { useMutation, useQueryClient } from '@tanstack/react-query'
import { favoritesApi } from '@/features/favorites/api/api'

export const useDeleteFavorite = () => {
  const queryClient = useQueryClient()

  const deleteFavoriteMutation = useMutation({
    mutationFn: ({ userId, cryptoId }: { userId: string, cryptoId: string }) =>
      favoritesApi.deleteFavorite(userId, cryptoId),
    async onSuccess(_, { userId }) {
      await queryClient.invalidateQueries({
        queryKey: [favoritesApi.baseKey, userId]
      })
    }
  })

  return {
    handleDelete: deleteFavoriteMutation.mutate as (args: { userId: string, cryptoId: string }) => Promise<void>,
    isPending: deleteFavoriteMutation.isPending
  }
}