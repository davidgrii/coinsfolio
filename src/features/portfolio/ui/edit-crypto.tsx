import React, { useEffect, useState } from 'react'
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle } from '@/shared/ui/sheet'
import { Icons } from '@/shared/icons'
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { X } from 'lucide-react'
import { formatNumber } from '@/shared/utils/formatters'
import { IAddCrypto } from '@/features/portfolio'
import { IPortfolioItem } from '@/types'

interface IProps {
  isOpen: boolean
  setIsOpen: (state: boolean) => void
  item?: IPortfolioItem
  onEditCrypto: (updatedCrypto: IAddCrypto) => void
}

export const EditCrypto: React.FC<IProps> = ({ isOpen, setIsOpen, item, onEditCrypto }) => {
  const [selectedCrypto, setSelectedCrypto] = useState<IPortfolioItem | undefined>(item)
  const [quantity, setQuantity] = useState<string | undefined>(item?.quantity?.toString() || '')
  const [purchase, setPurchase] = useState<string | undefined>(item?.purchasePrice?.toString() || '')
  const [notice, setNotice] = useState<string>(item?.notice || '')

  const { t } = useTranslation()

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

  const handleSubmit = () => {
    if (selectedCrypto && quantity && purchase) {
      const updatedData = {
        cryptoId: selectedCrypto.cryptoId,
        quantity: Number(quantity.replace(/\s/g, '').replace(',', '.')),
        purchasePrice: Number(purchase.replace(/\s/g, '').replace(',', '.')),
        notice: notice.trim() || '',
      }

      onEditCrypto(updatedData)
      setIsOpen(false)
    }
  }

  useEffect(() => {
    setSelectedCrypto(item)
    setQuantity(item?.quantity?.toString() || '')
    setPurchase(item?.purchasePrice?.toString() || '')
    setNotice(item?.notice || '')
  }, [item])

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent
        side={'top'}
        className={'bg-card rounded-2xl border-0 flex flex-col gap-6 items-center pt-10 pb-8'}
      >
        <SheetClose
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
          <X className="h-5 w-5" />
        </SheetClose>
        <SheetHeader className={'text-center'}>
          <SheetTitle className={'text-2xl'}>{t('edit_crypto.edit_coin')}</SheetTitle>
        </SheetHeader>

        {selectedCrypto && (
          <div className="flex items-center justify-between w-full py-4 px-4 bg-[#282828] rounded-xl">
            <div className="flex items-center gap-3">
              <Image
                width={32}
                height={32}
                src={selectedCrypto.crypto.image}
                alt={selectedCrypto.crypto.name}
                className="w-8 h-8"
              />
              <div className={'flex-col'}>
                <p className="text-sm text-foreground ">{selectedCrypto.crypto.symbol.toUpperCase()}</p>
                <p className="text-[8px] text-muted-foreground">{selectedCrypto.crypto.name}</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-muted-foreground">
              <Icons.Clear />
            </button>
          </div>
        )}

        <Input
          type={'text'}
          inputMode={'text'}
          placeholder={t('edit_crypto.quantity')}
          value={quantity}
          onChange={handleChangeQuantity}
          className={'font-medium py-8 px-6 rounded-xl text-[16px] bg-accent border-0'}
        />

        <Input
          type={'text'}
          inputMode={'decimal'}
          value={purchase}
          placeholder={t('add_crypto.purchase')}
          onChange={handleChangePurchase}
          className={'font-medium py-8 px-6 rounded-xl text-[16px] bg-accent border-0'}
        />

        <Input
          type={'text'}
          inputMode={'text'}
          placeholder={t('add_crypto.note')}
          value={notice ? notice : ''}
          onChange={(e) => setNotice(e.target.value)}
          className={'font-medium py-8 px-6 rounded-xl text-[16px] bg-accent border-0'}
        />

        <Button
          onClick={handleSubmit}
          className={'bg-foreground py-8 rounded-xl text-lg text-background font-semibold mx-auto w-full transition-colors hover:bg-foreground/75'}
        >
          {t('edit_crypto.btn')}
        </Button>
      </SheetContent>
    </Sheet>
  )
}
