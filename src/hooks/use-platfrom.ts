import { useLaunchParams } from '@telegram-apps/sdk-react'

export const usePlatform = () => {
  const lp = useLaunchParams()

  return lp.platform
}