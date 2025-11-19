import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { CirclePlus, X } from 'lucide-react'
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Input } from '@/components/ui/input'
import { ICrypto } from '@/types'
import { useTranslation } from 'react-i18next'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { formatNumber } from '@/lib/utils/formatters'
import { CryptoExample } from '@/features/portfolio'
import { useSearchCrypto } from '@/features/crypto-data/model/use-search-crypto'
import { Icons } from '@/components/icons'

interface IProps {
  isOpen: boolean
  setIsOpen: (state: boolean) => void
  isEmpty: boolean
  onAddCrypto: (cryptoId: string, quantity: number, purchase: number, notice?: string) => void
}

export const AddCrypto: React.FC<IProps> = ({ onAddCrypto, isOpen, setIsOpen, isEmpty }) => {
  const [quantity, setQuantity] = useState('')
  const [purchase, setPurchase] = useState('')
  const [notice, setNotice] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [selectedCrypto, setSelectedCrypto] = useState<ICrypto | null>(null)

  const { t } = useTranslation()

  const { searchResults = [] } = useSearchCrypto(searchValue)

  const handleTriggerClick = () => {
    setIsOpen(!isOpen)
  }

  const handleChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const formattedValue = formatNumber(value)

    setQuantity(formattedValue)
  }

  const handleChangePurchase = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const formattedValue = formatNumber(value)

    setPurchase(formattedValue)
  }

  const handleCryptoSelect = (crypto: ICrypto) => {
    setSelectedCrypto(crypto)
    setSearchValue('')
  }

  const handleRemoveCrypto = () => {
    setSelectedCrypto(null)
    setSearchValue('')
  }

  const handleSubmit = () => {
    if (selectedCrypto && quantity && purchase) {
      const cryptoId = selectedCrypto.id
      const numericQuantity = Number(quantity.replace(/\s/g, '').replace(',', '.'))
      const purchasePrice = Number(purchase.replace(/\s/g, '').replace(',', '.'))

      if (isNaN(numericQuantity) || numericQuantity <= 0 || isNaN(purchasePrice) || purchasePrice <= 0) {
        console.error('Invalid quantity or purchase price')
        return
      }

      onAddCrypto(cryptoId, numericQuantity, purchasePrice, notice)

      setSelectedCrypto(null)
      setPurchase('')
      setQuantity('')
      setNotice('')
      setIsOpen(false)
    }
  }

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          {!isEmpty ?
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9 }}
            >
              <button className={'bg-background/0'}>
                <CirclePlus
                  className={'w-9 h-9 cursor-pointer text-foreground transition-colors hover:text-muted-foreground'} />
              </button>
            </motion.div>

            : <CryptoExample onTriggerClick={handleTriggerClick} />
          }

        </SheetTrigger>

        <SheetContent
          side={'top'}
          className={'bg-card rounded-2xl border-0 flex flex-col gap-6 items-center pt-10 pb-8'}
        >
          <SheetClose
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary"
          >
            <X className="h-5 w-5" />
          </SheetClose>
          <SheetHeader className='text-center'>
            <SheetTitle className={'text-2xl'}>{t('add_crypto.add_coin')}</SheetTitle>
          </SheetHeader>
          {selectedCrypto ? (
            <div className="flex items-center justify-between w-full py-4 px-4 bg-[#282828] rounded-xl">
              <div className="flex items-center gap-3">
                <Image
                  width={32}
                  height={32}
                  src={selectedCrypto.image}
                  alt={selectedCrypto.name}
                  className="w-8 h-8"
                />

                <div className={'flex-col'}>
                  <p className="text-sm text-foreground ">{selectedCrypto.symbol.toUpperCase()}</p>
                  <p className="text-[8px] text-muted-foreground">{selectedCrypto.name}</p>
                </div>
              </div>
              <button onClick={handleRemoveCrypto} className="text-muted-foreground">
                <Icons.Clear />
              </button>
            </div>
          ) : (
            <div className="relative w-full">
              <Input
                type={'text'}
                inputMode={'text'}
                placeholder={t('add_crypto.choose')}
                value={searchValue}
                lang={'en'}
                onChange={(e) => setSearchValue(e.target.value)}
                className={'font-medium py-8 px-6 rounded-xl text-[16px] bg-[#282828] border-0'}
              />

              {searchValue && searchResults.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="absolute -bottom-44 mb-2 w-full z-10">
                    <div className={'bg-[#282828] rounded-xl shadow-md max-h-52 overflow-y-auto'}>
                      {searchResults.slice(0, 4).map((crypto) => (
                        <motion.div
                          key={crypto.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.8 }}
                        >
                          <div
                            className="flex items-center gap-3 px-4 py-2 hover:bg-muted-foreground rounded-lg cursor-pointer"
                            onClick={() => handleCryptoSelect(crypto)}
                          >
                            <Image
                              width={24}
                              height={24}
                              src={crypto.image}
                              alt={crypto.name}
                              className="w-6 h-6"
                            />

                            <p
                              className="text-[13px] text-nowrap">
                              {crypto.name.length > 18 ? crypto.name.slice(0, 18) + '...' : crypto.name} ({crypto.symbol.toUpperCase()})
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

            </div>
          )}

          <Input
            type={'text'}
            inputMode={'decimal'}
            placeholder={t('add_crypto.quantity')}
            value={quantity}
            onChange={handleChangeQuantity}
            className={'font-medium py-8 px-6 rounded-xl text-[16px] bg-accent border-0'}
          />

          <Input
            type={'text'}
            inputMode={'decimal'}
            placeholder={t('add_crypto.purchase')}
            value={purchase}
            onChange={handleChangePurchase}
            className={'font-medium py-8 px-6 rounded-xl text-[16px] bg-accent border-0'}
          />

          <Input
            type={'text'}
            inputMode={'text'}
            placeholder={t('add_crypto.note')}
            value={notice}
            onChange={(e) => setNotice(e.target.value)}
            className={'font-medium py-8 px-6 rounded-xl text-[16px] bg-accent border-0'}
          />

          <Button
            onClick={handleSubmit}
            className={'bg-foreground py-8 rounded-xl text-lg text-background font-semibold mx-auto w-full transition-colors hover:bg-foreground/75'}
          >
            {t('add_crypto.btn')}
          </Button>
        </SheetContent>
      </Sheet>
    </>
  )
}
