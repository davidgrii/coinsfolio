import { useMutation, useQuery, useQueryClient, type UseQueryResult } from '@tanstack/react-query'
import { useUser } from '@/app/_providers/user-provider'
import { BASE_URL } from '@/constants'
import type { IPercentageAlert, IPriceAlert, IVolatilityAlert } from '@/types'

export interface ISmartAlertResponse {
  price_alerts: IPriceAlert[];
  percentage_alerts: IPercentageAlert[];
  volatility_alerts: IVolatilityAlert[];
}

export const useSmartAlerts = (): UseQueryResult<ISmartAlertResponse, Error> => {
  const { userId } = useUser()

  return useQuery({
    queryKey: ['smartAlerts', userId],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/api/users/${userId}/smart-alerts`, {
        method: 'GET'
      })

      if (!res.ok) {
        throw new Error('Error creating price alert')
      }

      return await res.json()
    },
    select: (result) => result.data
  })
}

export const useCreatePriceAlert = () => {
  const { userId } = useUser()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ data }: { data: IPriceAlert }) => {
      const res = await fetch(
        `${BASE_URL}/api/users/${userId}/smart-alerts/price`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        }
      )

      if (!res.ok) {
        throw new Error('Error creating price alert')
      }

      return await res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['smartAlerts', userId] })
    }
  })
}

export const useCreatePercentageAlert = () => {
  const { userId } = useUser()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ data }: { data: IPercentageAlert }) => {
      const res = await fetch(
        `${BASE_URL}/api/users/${userId}/smart-alerts/percentage`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        }
      )

      if (!res.ok) {
        throw new Error('Error creating percentage alert')
      }

      return await res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['smartAlerts', userId] })
    }
  })
}

export const useCreateVolatilityAlert = () => {
  const { userId } = useUser()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ data }: { data: IPercentageAlert }) => {
      const res = await fetch(
        `${BASE_URL}/api/users/${userId}/smart-alerts/percentage`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        }
      )

      if (!res.ok) {
        throw new Error('Error creating percentage alert')
      }

      return await res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['smartAlerts', userId] })
    }
  })
}

export const useDeleteSmartAlert = () => {
  const { userId } = useUser()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ data }: { data: { alertId: string, alertType: string }}) => {
      const res = await fetch(
        `${BASE_URL}/api/users/${userId}/smart-alerts`,
        {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        }
      )

      if (!res.ok) {
        throw new Error('Error deleting price alert')
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['smartAlerts', userId] })
    }
  })
}