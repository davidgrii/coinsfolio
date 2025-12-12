import { useLaunchParams } from '@tma.js/sdk-react';

export const usePlatform = () => {
  const lp = useLaunchParams();

  return lp.tgWebAppPlatform;
};
