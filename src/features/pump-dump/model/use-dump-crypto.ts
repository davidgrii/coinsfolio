import { useQuery } from '@tanstack/react-query'
import { pumpDumpApi } from '@/features/pump-dump/api/api'

export const useDumpCryptos = () => {
  const { data, isLoading } = useQuery({
    queryKey: [pumpDumpApi.baseKeyDump],
    queryFn: pumpDumpApi.getCryptosDump,
    staleTime: 30 * 60 * 1000
  })

  const dumpCryptos = data || []

  return {
    dumpCryptos,
    isLoading
  }
}

