import { create } from 'zustand'
import { ICrypto } from '@/types'
import { ISelectedCrypto } from '@/features/crypto-details/model/use-crypto-by-id'

interface ICryptoModalStore {
  rank: number
  isOpen: boolean
  selectedCrypto: ISelectedCrypto | null
  openModal: (crypto: ICrypto, rank: number) => void
  closeModal: () => void
}

export const useCryptoModalStore = create<ICryptoModalStore>((set) => ({
  rank: 0,
  isOpen: false,
  selectedCrypto: null,
  openModal: (crypto, rank) => set({ isOpen: true, selectedCrypto: crypto, rank: rank + 1 }),
  closeModal: () => set({ isOpen: false, selectedCrypto: null })
}))