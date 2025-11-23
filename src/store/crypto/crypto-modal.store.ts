import { create } from 'zustand'
import { ICrypto } from '@/types'

interface ICryptoModalStore {
  isOpen: boolean
  selectedCrypto: ICrypto | null
  setIsOpen: (open: boolean) => void
  setSelectedCrypto: (crypto: ICrypto) => void
}

export const useCryptoModalStore = create<ICryptoModalStore>((set) => ({
  isOpen: false,
  selectedCrypto: null,
  setIsOpen: (open) => set({ isOpen: open }),
  setSelectedCrypto: (crypto) => set({ selectedCrypto: crypto })
}))