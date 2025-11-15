import { useQuery } from '@tanstack/react-query'
import { pumpDumpApi } from '@/features/pump-dump/api/api'

export const usePumpCryptos = () => {
  const { data, isLoading } = useQuery({
    queryKey: [pumpDumpApi.baseKeyPump],
    queryFn: pumpDumpApi.getCryptosPump,
    staleTime: 30 * 60 * 1000
  })

  const pumpCryptos = data || []

  return {
    pumpCryptos,
    isLoading
  }
}

