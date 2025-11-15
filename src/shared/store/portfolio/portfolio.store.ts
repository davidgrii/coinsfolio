import { create } from 'zustand'
import { IPortfolioStore } from '@/types'

export const usePortfolioStore = create<IPortfolioStore>((set) => ({
  portfolio: [],
  initialPortfolio: [],
  totalBalance: 0,
  totalProfitLoss: 0,
  totalInvestedUSD: 0,
  totalPriceChange24h: 0,
  totalPercentageChange24h: 0,
  totalProfitLossPercentage: 0,
  isSorted: false,
  isLoading: true,

  setPortfolio: (newPortfolio) => {
    return set(() => ({ portfolio: newPortfolio }))
  },

  calculateTotalBalance: () => set((state) => {
    const total = state.portfolio.reduce(
      (acc, crypto) => {
        if (crypto.crypto && crypto.quantity) {
          return acc + crypto.crypto.current_price * crypto.quantity
        }
        return acc
      }, 0
    )
    return { totalBalance: total }
  }),

  calculateTotalInvestedUSD: () => set((state) => {
    const totalInvestedUSD = state.portfolio.reduce(
      (acc, crypto) => {
        if (crypto.purchasePrice && crypto.quantity) {
          return acc + crypto.purchasePrice * crypto.quantity
        }
        return acc
      }, 0
    )
    return { totalInvestedUSD: totalInvestedUSD }
  }),

  calculateTotalProfitLoss: () => set((state) => {
    const totalProfitLoss = state.portfolio.reduce((acc, crypto) => {
      if (crypto.crypto && crypto.quantity) {
        return acc + ((crypto.crypto.current_price - crypto.purchasePrice) * crypto.quantity)
      }
      return acc
    }, 0)

    return { totalProfitLoss }
  }),

  calculateTotalProfitLossPercentage: () => set((state) => {
    const totalInvested = state.portfolio.reduce((acc, crypto) => {
      if (crypto.purchasePrice && crypto.quantity) {
        return acc + crypto.purchasePrice * crypto.quantity
      }
      return acc
    }, 0)

    const totalProfitLoss = state.portfolio.reduce((acc, crypto) => {
      if (crypto.crypto && crypto.quantity) {
        return acc + ((crypto.crypto.current_price - crypto.purchasePrice) * crypto.quantity)
      }
      return acc
    }, 0)

    const profitLossPercentage = totalInvested > 0 ? (totalProfitLoss / totalInvested) * 100 : 0
    return { totalProfitLossPercentage: profitLossPercentage }
  }),

  calculateTotalPercentageChange24h: () => set((state) => {
    const totalPercentageChange = state.portfolio.reduce((acc, crypto) => {
      if (crypto.crypto && crypto.quantity) {
        const cryptoValue = crypto.crypto.current_price * crypto.quantity
        const percentageContribution = (crypto.crypto.price_change_percentage_24h / 100) * cryptoValue
        return acc + percentageContribution
      }
      return acc
    }, 0)

    const totalBalance = state.portfolio.reduce((acc, crypto) => {
        if (crypto.crypto && crypto.quantity) {
          return acc + crypto.crypto.current_price * crypto.quantity
        }
        return acc
      }, 0
    )

    const overallPercentageChange = totalBalance > 0 ? (totalPercentageChange / totalBalance) * 100 : 0
    return { totalPercentageChange24h: overallPercentageChange }
  }),

  calculateTotalPriceChange24h: () => set((state) => {
    const totalPriceChange24h = state.portfolio.reduce((acc, crypto) => {
      if (crypto.crypto && crypto.quantity) {
        const priceChange = crypto.crypto.price_change_24h * crypto.quantity
        return acc + priceChange
      }
      return acc
    }, 0)

    return { totalPriceChange24h }
  }),

  sortPortfolio: () => {
    set((state) => {
      let newPortfolio
      let newSorted

      if (state.isSorted) {
        newPortfolio = [...state.initialPortfolio]
        newSorted = false
      } else {
        newPortfolio = [...state.portfolio].sort((a, b) =>
          (b.quantity * b.crypto.current_price) - (a.quantity * a.crypto.current_price)
        )
        newSorted = true
      }

      return { portfolio: newPortfolio, isSorted: newSorted }
    })
  }
}))