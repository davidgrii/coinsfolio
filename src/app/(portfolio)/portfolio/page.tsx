'use client'

import React, { useEffect, useState } from 'react'

import { motion } from 'framer-motion'
import { usePortfolioStore } from '@/store/portfolio/portfolio.store'

import { useTelegramUser } from '@/hooks/use-telegram-user'

import {
  AddCrypto,
  BalanceTableHeader,
  EditCrypto,
  IUpdatedCrypto,
  PortfolioItem,
  useAddCrypto,
  useDeleteCrypto,
  usePortfolio,
  useUpdateCrypto
} from '@/features/portfolio'
import { Container } from '@/components/container'
import { CryptoSkeleton } from '@/components/crypto-skeleton'
import { Card } from '@/components/ui/card'
import { Accordion } from '@/components/ui/accordion'

export default function PortfolioPage() {
  const { data } = useTelegramUser()
  const userId = data?.userId || ''

  const { portfolioData: portfolio, isLoading } = usePortfolio(userId)
  const { handleDelete } = useDeleteCrypto()
  const { handleAdd } = useAddCrypto()
  const { handleUpdate } = useUpdateCrypto()

  const [sortedPortfolio, setSortedPortfolio] = useState(portfolio)
  const [isAddCryptoOpen, setIsAddCryptoOpen] = useState<boolean>(false)
  const [isEditCryptoOpen, setIsEditCryptoOpen] = useState<boolean>(false)
  const [activeCryptoId, setActiveCryptoId] = useState<string | null>(null)

  const {
    calculateTotalBalance,
    calculateTotalPercentageChange24h,
    calculateTotalProfitLoss,
    calculateTotalProfitLossPercentage,
    calculateTotalPriceChange24h
  } = usePortfolioStore()

  const handleSortPortfolio = () => {
  }

  const handleAddCrypto = async (cryptoId: string, quantity: number, purchasePrice: number, notice?: string) => {
    const data = {
      purchasePrice,
      cryptoId,
      quantity,
      notice
    }

    await handleAdd({ userId, data })

    calculateTotalBalance()
    calculateTotalProfitLoss()
    calculateTotalProfitLossPercentage()
    calculateTotalPercentageChange24h()
    calculateTotalPriceChange24h()
    setIsAddCryptoOpen(false)
  }

  const handleUpdateCrypto = async (userId: string, updatedData: IUpdatedCrypto) => {

    await handleUpdate({ userId, updatedData })

    calculateTotalBalance()
    calculateTotalProfitLoss()
    calculateTotalProfitLossPercentage()
    calculateTotalPercentageChange24h()
    calculateTotalPriceChange24h()
  }

  const handleDeleteCrypto = async (cryptoId: string) => {
    await handleDelete({ cryptoId, userId })

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
    const cryptoToEdit = portfolio.find(crypto => crypto.cryptoId === cryptoId)

    if (cryptoToEdit) {
      setActiveCryptoId(cryptoToEdit.cryptoId)
      setIsEditCryptoOpen(true)
    }
  }

  useEffect(() => {
      if (portfolio.length > 0) {
        calculateTotalBalance()
        calculateTotalProfitLoss()
        calculateTotalProfitLossPercentage()
        calculateTotalPercentageChange24h()
        calculateTotalPriceChange24h()
      }
    },
    [portfolio,
      calculateTotalBalance,
      calculateTotalPercentageChange24h,
      calculateTotalProfitLoss,
      calculateTotalProfitLossPercentage,
      calculateTotalPriceChange24h
    ]
  )

  return (
    <Container className={'pt-0'}>
      <BalanceTableHeader onSort={handleSortPortfolio}/>

      {isLoading ? (
        <CryptoSkeleton className={'py-4'} itemsCount={10} />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Card className={'bg-background grid border-0'}>
            <Accordion type="single" collapsible className="w-full">
              {portfolio.map((item, index) => (
                <PortfolioItem
                  key={index}
                  item={item}
                  onEdit={handleEditCrypto}
                  onDelete={handleDeleteCrypto}
                />
              ))}
            </Accordion>
          </Card>
        </motion.div>
      )}

      <div className={'flex flex-col items-center justify-center mt-10'}>
        {activeCryptoId && (
          <EditCrypto
            isOpen={isEditCryptoOpen}
            setIsOpen={setIsEditCryptoOpen}
            onEditCrypto={(updatedData) => handleUpdateCrypto(userId, updatedData)}
            item={portfolio.find(crypto => crypto.cryptoId === activeCryptoId)}
          />
        )}

        <AddCrypto
          onAddCrypto={handleAddCrypto}
          isOpen={isAddCryptoOpen}
          setIsOpen={setIsAddCryptoOpen}
          isEmpty={!isLoading && portfolio.length === 0}
        />
      </div>
    </Container>
  )
}
