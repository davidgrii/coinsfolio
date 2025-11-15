import { useQuery } from '@tanstack/react-query'
import { cryptoByIdApi } from '@/features/crypto-details/api/api'
import { ICrypto } from '@/types'

export interface ISelectedCrypto extends ICrypto {
  price?: number
}

export const useCryptoById = (cryptoId: string | null) => {
  const { data, isLoading } = useQuery({
    queryKey: [cryptoByIdApi.baseKey, cryptoId],
    queryFn: () => cryptoByIdApi.getCryptoById(cryptoId),
    staleTime: 3 * 60 * 1000,
    enabled: !!cryptoId
  })

  const selectedCryptoById = data || null

  return {
    selectedCryptoById,
    isLoading
  }
}