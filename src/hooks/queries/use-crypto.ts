import {
  useInfiniteQuery,
  useQuery,
  type UseQueryResult,
} from '@tanstack/react-query';
import type { ICrypto, ICryptoDetails, IFavorite } from '@/types';
import { BASE_URL } from '@/constants';
import { useUser } from '@/app/_providers/user-provider';

export const useInfiniteCryptos = () => {
  return useInfiniteQuery({
    queryKey: ['cryptos'],
    initialPageParam: 1,
    staleTime: 3 * 60 * 1000,
    queryFn: async ({ pageParam = 1 }) => {
      const res = await fetch(
        `${BASE_URL}/api/cryptos?page=${pageParam}&limit=${50}`,
      );

      if (!res.ok) {
        throw new Error('Ошибка при загрузке данных');
      }

      return await res.json();
    },
    getNextPageParam: (lastPage) => lastPage.next,
  });
};

export const useCrypto = (
  cryptoId: string,
): UseQueryResult<ICryptoDetails, Error> => {
  return useQuery({
    queryKey: ['crypto', cryptoId],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/api/cryptos/${cryptoId}`);

      if (!res.ok) {
        throw new Error('Ошибка при получении криптовалюты');
      }

      return await res.json();
    },
    staleTime: 3 * 60 * 1000,
    enabled: !!cryptoId,
  });
};

export const useFavorites = (): UseQueryResult<IFavorite, Error> => {
  const { userId } = useUser();

  return useQuery({
    queryKey: ['favorites', userId],
    staleTime: 3 * 60 * 1000,
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/api/users/${userId}/favorites`);

      if (!res.ok) {
        throw new Error('Ошибка при загрузке данных');
      }

      return await res.json();
    },
    enabled: !!userId,
  });
};

export const usePumpCryptos = (): UseQueryResult<ICrypto[], Error> => {
  return useQuery({
    queryKey: ['pumpCryptos'],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/api/pumpdump`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'pump',
          limit: 50,
        }),
      });

      if (!res.ok) {
        throw new Error('Ошибка при получении Dump данных: ' + res.statusText);
      }

      return await res.json();
    },
    staleTime: 30 * 60 * 1000,
  });
};

export const useDumpCryptos = (): UseQueryResult<ICrypto[], Error> => {
  return useQuery({
    queryKey: ['dumpCryptos'],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/api/pumpdump`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'dump',
          limit: 50,
        }),
      });

      if (!res.ok) {
        throw new Error('Ошибка при получении Dump данных: ' + res.statusText);
      }

      return await res.json();
    },
    staleTime: 30 * 60 * 1000,
  });
};

export const useTrendingCryptos = (): UseQueryResult<ICrypto[], Error> => {
  return useQuery({
    queryKey: ['trendingCryptos'],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/api/trending`);

      if (!res.ok) {
        throw new Error('Ошибка при загрузке данных');
      }

      return await res.json();
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useSearchCrypto = ({
  query,
  pageParam = 1,
  limit = 20,
}: {
  query: string;
  pageParam?: number;
  limit?: number;
}): UseQueryResult<ICrypto[], Error> => {
  return useQuery({
    queryKey: ['cryptoSearch', query],
    queryFn: async () => {
      const res = await fetch(
        `${BASE_URL}/api/cryptos/search?q=${query}&page=${pageParam}&limit=${limit}`,
      );

      if (!res.ok) {
        throw new Error('Ошибка при поиске криптовалюты');
      }

      return await res.json();
    },
    select: (result) => result.data,
    staleTime: 3 * 60 * 1000,
    enabled: !!query,
  });
};
