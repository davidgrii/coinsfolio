import { useMutation, useQueryClient } from '@tanstack/react-query'
import { favoritesApi } from '@/features/favorites/api/api'

export const useAddFavorite = () => {
  const queryClient = useQueryClient()

  const addFavoriteMutation = useMutation<void, Error, { userId: string, cryptoId: string }>({
    mutationFn: async ({ userId, cryptoId }: { userId: string, cryptoId: string }) =>
      favoritesApi.addFavorite(userId, cryptoId),
    async onSuccess(_, { userId }) {
      await queryClient.invalidateQueries({
        queryKey: [favoritesApi.baseKey, userId]
      })
    }
  })

  return {
    handleAdd: addFavoriteMutation.mutate as (args: { userId: string, cryptoId: string }) => Promise<void>,
    isPending: addFavoriteMutation.isPending
  }
}