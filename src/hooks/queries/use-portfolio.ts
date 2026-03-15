import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import type { IAddCrypto, IPortfolio, IUpdatedCrypto } from '@/types';
import { useUser } from '@/app/_providers/user-provider';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BASE_URL } from '@/constants';

export const usePortfolio = (): UseQueryResult<IPortfolio[], Error> => {
  const { userId } = useUser();

  return useQuery({
    queryKey: ['portfolio', userId],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/api/users/${userId}/portfolio`);

      if (!res.ok) {
        throw new Error('Error retrieving portfolio: ' + res.statusText);
      }

      return await res.json();
    },
    select: (result) => result.data,
    enabled: !!userId,
  });
};

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
          'Error adding a cryptocurrency to your portfolio: ' + res.statusText,
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
          'Error while editing a cryptocurrency in the portfolio: ' +
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
          'Error when removing cryptocurrency from the portfolio: ' + res.statusText,
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
