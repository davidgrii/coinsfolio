import { useMutation, useQuery } from '@tanstack/react-query'
import { useUser } from '@/app/_providers/user-provider'
import { BASE_URL } from '@/constants'

export const useCreatePriceAlerts = () => {
  const { userId } = useUser()

  return useMutation({
    mutationFn: async ({ data }: { data: any }) => {
      const res = await fetch(`${BASE_URL}/api/smart-alerts/price/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })

      if (!res.ok) {
        throw new Error('Ошибка при получении криптовалюты')
      }

      return await res.json()
    },
    onSuccess: (data) => {
      console.log(data)
    },
  })
}