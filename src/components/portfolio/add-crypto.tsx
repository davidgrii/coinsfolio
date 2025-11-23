import React, { useState } from 'react'
import { CirclePlus } from 'lucide-react'
import { ICrypto } from '@/types'
import { useTranslation } from 'react-i18next'
import Image from 'next/image'
import { Icons } from '@/components/icons'
import { Button, FixedLayout, Input, Modal, Placeholder, Tappable } from '@telegram-apps/telegram-ui'
import {
  ModalHeader
} from '@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader'
import { Icon24Close } from '@telegram-apps/telegram-ui/dist/icons/24/close'
import { useSearchCrypto } from '@/hooks/queries/use-crypto'
import { formatNumber } from '@/lib/utils'
import { motion } from 'framer-motion'
import { Skeleton } from '@/components/ui/skeleton'

function AddCryptoModalSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center px-3">
      <Skeleton className={'animate-pulse h-[70px] w-full rounded-xl mb-8'} />

      <Skeleton className={'animate-pulse h-[200px] w-full rounded-xl mb-8'} />
      <Skeleton className={'animate-pulse h-[200px] w-full rounded-xl '} />
    </div>
  )
}

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

  const { data: cryptos, isLoading: isCryptosLoading } = useSearchCrypto({ query: searchValue })

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
      <Modal
        open={isOpen}
        onOpenChange={setIsOpen}
        header={<ModalHeader/>}
        trigger={
        <FixedLayout  vertical='bottom' className='flex justify-center !w-full !bottom-[100px]'>
          <Button size="m"><CirclePlus className={'w-9 h-9 cursor-pointer text-foreground transition-colors'} /></Button>
        </FixedLayout>
      }
      >
        <Placeholder description='' header={t('add_crypto.add_coin')}/>

        {!cryptos || isCryptosLoading ? (
          <AddCryptoModalSkeleton/>
        ) : (
          <>

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
                  <Icons.clear />
                </button>
              </div>
            ) : (
              <div className="relative w-full">
                <Input
                  autoFocus={true}
                  header={t('add_crypto.choose')}
                  type={'text'}
                  inputMode={'text'}
                  placeholder='Bitcoin'
                  value={searchValue}
                  lang={'en'}
                  onChange={(e) => setSearchValue(e.target.value)}
                />

                {searchValue && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="absolute -bottom-44 mb-2 w-full z-10">
                      <div className={'bg-[#282828] rounded-xl shadow-md max-h-52 overflow-y-auto'}>
                        {cryptos.slice(0, 4).map((crypto) => (
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
              header={t('add_crypto.quantity')}
              type='number'
              inputMode={'decimal'}
              placeholder='22'
              value={quantity}
              onChange={handleChangeQuantity}
              after={<Tappable Component="div" style={{ display: 'flex' }} onClick={() => setQuantity('')}><Icon24Close /></Tappable>}
            />

            <Input
              header={t('add_crypto.purchase')}
              type='number'
              inputMode={'decimal'}
              placeholder='0.12'
              value={purchase}
              onChange={handleChangePurchase}
              after={<Tappable Component="div" style={{ display: 'flex' }} onClick={() => setPurchase('')}><Icon24Close /></Tappable>}
            />

            <Input
              header={t('add_crypto.note')}
              type='text'
              placeholder='Note for you'
              value={notice}
              onChange={(e) => setNotice(e.target.value)}
              after={<Tappable Component="div" style={{ display: 'flex' }} onClick={() => setNotice('')}><Icon24Close /></Tappable>}
            />

            <Button
              size='l'
              mode='filled'
              onClick={handleSubmit}
              className={'bg-foreground py-8 rounded-xl text-lg text-background font-semibold mx-auto w-full transition-colors hover:bg-foreground/75'}
            >
              {t('add_crypto.btn')}
            </Button>
          </>
        )}
      </Modal>
    </>
  )
}
