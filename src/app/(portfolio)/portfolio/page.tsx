'use client'

import React, { useCallback, useEffect, useState } from 'react'

import { motion } from 'framer-motion'
import { usePortfolioStore } from '@/store/portfolio/portfolio.store'

import { useTelegramUser } from '@/hooks/use-telegram-user'

import { Container } from '@/components/container'
import { Accordion } from '@/components/ui/accordion'
import { List } from '@telegram-apps/telegram-ui'
import { BalanceTableHeader } from '@/components/portfolio/balance-table-header'
import { CryptoSkeletonList } from '@/components/crypto-skeleton-list'
import { PortfolioItem } from '@/components/portfolio/portfolio-item'
import type { IUpdatedCrypto } from '@/types'
import { usePortfolio } from '@/hooks/queries/use-portfolio'
import {
  useAddCrypto,
  useDeleteCrypto,
  useUpdateCrypto
} from '@/hooks/queries/use-portfolio-mutation'
import { EditCrypto } from '@/components/portfolio/edit-crypto'
import { AddCrypto } from '@/components/portfolio/add-crypto'

export default function PortfolioPage() {
  const { data } = useTelegramUser()
  const userId = data?.userId || ''

  const { data: portfolio, isLoading: isPortfolioLoading } = usePortfolio(userId)
  const { mutate: deleteCrypto } = useDeleteCrypto()
  const { mutate: addCrypto } = useAddCrypto()
  const { mutate: updateCrypto } = useUpdateCrypto()

  const [sortedPortfolio, setSortedPortfolio] = useState(portfolio)
  const [isAddCryptoOpen, setIsAddCryptoOpen] = useState<boolean>(false)
  const [isEditCryptoOpen, setIsEditCryptoOpen] = useState<boolean>(false)
  const [activeCryptoId, setActiveCryptoId] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  const {
    calculateTotalBalance,
    calculateTotalPercentageChange24h,
    calculateTotalProfitLoss,
    calculateTotalProfitLossPercentage,
    calculateTotalPriceChange24h
  } = usePortfolioStore()

  const handleSortPortfolio = useCallback(() => {
    setSortedPortfolio((prev) => {
      if (!prev) return prev

      return [...prev].sort((a, b) => {
        const v1 = a.quantity * a.crypto.current_price
        const v2 = b.quantity * b.crypto.current_price

        return sortDirection === 'asc' ? v1 - v2 : v2 - v1
      })
    })

    setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'))
  }, [sortDirection, setSortedPortfolio])

  const handleAddCrypto = async (
    cryptoId: string,
    quantity: number,
    purchasePrice: number,
    notice?: string
  ) => {
    const data = {
      purchasePrice,
      cryptoId,
      quantity,
      notice
    }

    addCrypto({ userId, data })

    calculateTotalBalance()
    calculateTotalProfitLoss()
    calculateTotalProfitLossPercentage()
    calculateTotalPercentageChange24h()
    calculateTotalPriceChange24h()
    setIsAddCryptoOpen(false)
  }

  const handleUpdateCrypto = async (
    userId: string,
    updatedData: IUpdatedCrypto
  ) => {
    updateCrypto({ userId, data: updatedData })

    calculateTotalBalance()
    calculateTotalProfitLoss()
    calculateTotalProfitLossPercentage()
    calculateTotalPercentageChange24h()
    calculateTotalPriceChange24h()
  }

  const handleDeleteCrypto = async (cryptoId: string) => {
    deleteCrypto({ cryptoId, userId })

    if (activeCryptoId === cryptoId) {
      setActiveCryptoId(null)
      setIsEditCryptoOpen(false)
    }

    calculateTotalBalance()
    calculateTotalProfitLoss()
    calculateTotalProfitLossPercentage()
    calculateTotalPercentageChange24h()
    calculateTotalPriceChange24h()
  }

  const handleEditCrypto = (cryptoId: string) => {
    const cryptoToEdit = portfolio?.find(
      (crypto) => crypto.cryptoId === cryptoId
    )

    if (cryptoToEdit) {
      setActiveCryptoId(cryptoToEdit.cryptoId)
      setIsEditCryptoOpen(true)
    }
  }

  useEffect(() => {
    if ((portfolio?.length || 0) > 0) {
      setSortedPortfolio(portfolio)
      calculateTotalBalance()
      calculateTotalProfitLoss()
      calculateTotalProfitLossPercentage()
      calculateTotalPercentageChange24h()
      calculateTotalPriceChange24h()
    }
  }, [
    portfolio,
    calculateTotalBalance,
    calculateTotalPercentageChange24h,
    calculateTotalProfitLoss,
    calculateTotalProfitLossPercentage,
    calculateTotalPriceChange24h
  ])

  useEffect(() => {
    if (portfolio?.length === 0) setIsAddCryptoOpen(true)
  }, [portfolio])

  return (
    <Container back={true}>
      <BalanceTableHeader onSort={handleSortPortfolio} />

      {!sortedPortfolio || isPortfolioLoading ? (
        <CryptoSkeletonList isPortfolio={true} itemsCount={10} />
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
          >
            <List
              className={
                'grid gap-2 overflow-y-auto max-h-[70vh] pb-[64px] scrollbar-none -mt-4 !pt-0 !px-0'
              }
            >
              <Accordion type="single" collapsible className="w-full">
                {sortedPortfolio.map((crypto, index) => (
                  <PortfolioItem
                    key={index}
                    item={crypto}
                    onEdit={handleEditCrypto}
                    onDelete={handleDeleteCrypto}
                  />
                ))}
              </Accordion>

            </List>
          </motion.div>

          <EditCrypto
            isOpen={isEditCryptoOpen}
            setIsOpen={setIsEditCryptoOpen}
            item={sortedPortfolio.find((crypto) => crypto.cryptoId === activeCryptoId) || null}
            onEditCrypto={(updatedData) => handleUpdateCrypto(userId, updatedData)}
          />
        </>
      )}

      {isPortfolioLoading ? null : (
        <AddCrypto
          isOpen={isAddCryptoOpen}
          isPortfolioEmpty={(portfolio?.length || 0) === 0}
          onAddCrypto={handleAddCrypto}
          setIsOpen={setIsAddCryptoOpen}
        />
      )}
    </Container>
  )
}
