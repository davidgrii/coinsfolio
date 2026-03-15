import {
  useMutation,
  type UseMutationResult,
  useQueryClient,
  type UseQueryResult,
} from '@tanstack/react-query';
import { BASE_URL } from '@/constants';

export const useAddFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      cryptoId,
    }: {
      userId: string;
      cryptoId: string;
    }) => {
      const res = await fetch(`${BASE_URL}/api/users/${userId}/favorites`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cryptoId }),
      });

      if (!res.ok) {
        throw new Error(`Error adding to favorites: ${res.statusText}`);
      }
    },
    onSuccess(_, { userId }) {
      queryClient.invalidateQueries({
        queryKey: ['favorites', userId],
      });
    },
  });
};

export const useDeleteFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      cryptoId,
    }: {
      userId: string;
      cryptoId: string;
    }) => {
      const res = await fetch(`${BASE_URL}/api/users/${userId}/favorites`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cryptoId }),
      });

      if (!res.ok) {
        throw new Error(`Error removing from favorites: ${res.statusText}`);
      }
    },
    onSuccess(_, { userId }) {
      queryClient.invalidateQueries({
        queryKey: ['favorites', userId],
      });
    },
  });
};
