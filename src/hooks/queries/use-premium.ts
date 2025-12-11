import {
  useMutation,
  type UseMutationResult,
  useQuery,
  type UseQueryResult,
} from '@tanstack/react-query';
import { BASE_URL } from '@/constants';
import { useUser } from '@/app/_providers/user-provider';

export const usePremium = () => {
  const { userId } = useUser();

  return useQuery({
    queryKey: ['premium', userId],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/api/users/premium`);

      if (!res.ok) {
        throw new Error('Ошибка при запросе квитанции');
      }

      return await res.json();
    },
    enabled: !!userId,
  });
};

export const useCreatePremiumInvoice = () => {
  return useMutation({
    mutationFn: async (): Promise<string> => {
      const res = await fetch(`${BASE_URL}/api/users/premium-invoice`, {
        method: 'POST',
      });

      if (!res.ok) {
        throw new Error('Ошибка при запросе квитанции');
      }

      return await res.json();
    },
  });
};
