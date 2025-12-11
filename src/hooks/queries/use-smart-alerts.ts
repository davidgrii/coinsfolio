import { useMutation } from '@tanstack/react-query';
import { useUser } from '@/app/_providers/user-provider';
import { BASE_URL } from '@/constants';
import type { IPercentageAlert, IPriceAlert } from '@/types';

export const useCreatePriceAlert = () => {
  const { userId } = useUser();

  return useMutation({
    mutationFn: async ({ data }: { data: IPriceAlert }) => {
      const res = await fetch(
        `${BASE_URL}/api/users/${userId}/smart-alerts/price`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        },
      );

      if (!res.ok) {
        throw new Error('Error creating price alert');
      }

      return await res.json();
    },
  });
};

export const useCreatePercentageAlert = () => {
  const { userId } = useUser();

  return useMutation({
    mutationFn: async ({ data }: { data: IPercentageAlert }) => {
      const res = await fetch(
        `${BASE_URL}/api/users/${userId}/smart-alerts/percentage`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        },
      );

      if (!res.ok) {
        throw new Error('Error creating percentage alert');
      }

      return await res.json();
    },
  });
};

export const useCreateVolatilityAlert = () => {
  const { userId } = useUser();

  return useMutation({
    mutationFn: async ({ data }: { data: IPercentageAlert }) => {
      const res = await fetch(
        `${BASE_URL}/api/users/${userId}/smart-alerts/percentage`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        },
      );

      if (!res.ok) {
        throw new Error('Error creating percentage alert');
      }

      return await res.json();
    },
  });
};
