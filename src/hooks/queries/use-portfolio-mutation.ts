import {
  useMutation,
  type UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import type { IAddCrypto, IPortfolio, IUpdatedCrypto } from '@/types';
import { BASE_URL } from '@/constants';

export const useAddCrypto = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      data,
    }: {
      userId: string;
      data: IAddCrypto;
    }) => {
      const res = await fetch(`${BASE_URL}/api/users/${userId}/portfolio`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error(
          'Ошибка при добавлении криптовалюты в портфолио: ' + res.statusText,
        );
      }
    },
    onSuccess(_, { userId }) {
      queryClient.invalidateQueries({
        queryKey: ['portfolio', userId],
      });
    },
  });
};

export const useUpdateCrypto = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      data,
    }: {
      userId: string;
      data: IUpdatedCrypto;
    }) => {
      const res = await fetch(`${BASE_URL}/api/users/${userId}/portfolio`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error(
          'Ошибка при редактировании криптовалюты в портфолио: ' +
            res.statusText,
        );
      }

      return await res.json();
    },
    onSuccess(_, { userId }) {
      queryClient.invalidateQueries({
        queryKey: ['portfolio', userId],
      });
    },
  });
};

export const useDeleteCrypto = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      cryptoId,
    }: {
      userId: string;
      cryptoId: string;
    }) => {
      const res = await fetch(`${BASE_URL}/api/users/${userId}/portfolio`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cryptoId }),
      });

      if (!res.ok) {
        throw new Error(
          'Ошибка при удалении криптовалюты из портфолио: ' + res.statusText,
        );
      }
    },
    onSuccess(_, { userId }) {
      queryClient.invalidateQueries({
        queryKey: ['portfolio', userId],
      });
    },
  });
};
