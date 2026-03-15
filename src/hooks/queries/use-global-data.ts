import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import type { IGlobalMarketData } from '@/types';
import { BASE_URL } from '@/constants';

export const useGlobalData = (): UseQueryResult<IGlobalMarketData, Error> => {
  return useQuery({
    queryKey: ['globalData'],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/api/global`);

      if (!res.ok) {
        throw new Error('Error retrieving data: ' + res.statusText);
      }

      return await res.json();
    },
    staleTime: 1000 * 60 * 3,
  });
};
