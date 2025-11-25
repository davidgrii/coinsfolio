import { useQuery } from '@tanstack/react-query';
import i18n from '@/i18n';
import Cookies from 'js-cookie';

interface ITelegramUser {
  // @ts-ignore
  bot: typeof window.Telegram.WebApp | null;
  userId: string;
  userLanguage: string;
}

const fetchUserData = async (): Promise<ITelegramUser> => {
  const cachedUserId = Cookies.get('userId');
  const isBrowser = typeof window !== 'undefined';

  if (cachedUserId && isBrowser) {
    return {
      // @ts-ignore
      bot: window.Telegram.WebApp || null,
      userId: cachedUserId,
      userLanguage: 'en',
    };
  }

  // @ts-ignore
  const botInstance = isBrowser ? window.Telegram.WebApp : null;
  const userIdInstance = isBrowser
    ? String(botInstance?.initDataUnsafe?.user?.id || '1422316270')
    : '1422316270';
  const userLanguage = botInstance?.initDataUnsafe?.user?.language_code || 'en';

  try {
    await i18n.changeLanguage(userLanguage);
  } catch (error) {
    console.error('Ошибка при смене языка:', error);
  }

  const data = {
    userId: userIdInstance,
    userLanguage,
    bot: botInstance,
  };

  if (botInstance) {
    botInstance.ready();
    botInstance.isVerticalSwipesEnabled = false;

    if (botInstance.isExpanded) botInstance.expand();
  }

  Cookies.set('userId', userIdInstance, { expires: 7 });

  return data;
};

export const useTelegramUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: fetchUserData,
    staleTime: Infinity,
  });
};
