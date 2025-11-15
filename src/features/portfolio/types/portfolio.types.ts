

export interface IAddCrypto {
  cryptoId: string
  quantity: number
  purchasePrice: number
  notice?: string
}

export interface IUpdatedCrypto {
  cryptoId: string
  quantity: number
  purchasePrice: number
  notice?: string
}