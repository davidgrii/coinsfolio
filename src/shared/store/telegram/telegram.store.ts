import { create } from 'zustand'
import i18n from '@/core/i18n'

interface ITelegramStore {
  bot: typeof window.Telegram.WebApp | null
  userId: string
  userLanguage: string
  initializeBot: () => Promise<void>
}

export const useTelegramStore = create<ITelegramStore>((set, get) => ({
  bot: null,
  userId: '',
  userLanguage: 'en',

  initializeBot: async () => {
    const isBrowser = typeof window !== 'undefined'
    const botInstance = isBrowser ? window.Telegram.WebApp : null
    const userIdInstance = isBrowser ? String(botInstance?.initDataUnsafe?.user?.id || '1422316270') : ''
    const userLanguage = botInstance?.initDataUnsafe?.user?.language_code || 'en'

    set({ bot: botInstance, userId: userIdInstance, userLanguage })

    try {
      await i18n.changeLanguage(userLanguage)
    } catch (error) {
      console.error('Ошибка при смене языка:', error)
    }

    if (botInstance) {
      botInstance.ready()
      // bot.setHeaderColor('#000')
      // bot.setBackgroundColor('#000')
      // bot.setBottomBarColor('#000')
      botInstance.isVerticalSwipesEnabled = false

      if (!botInstance.isExpanded) {
        botInstance.expand()
      }
    }
  },
}))
