import React, { useEffect, useMemo, useState } from 'react'
import { CirclePlus } from 'lucide-react'
import { ICrypto } from '@/types'
import { useTranslation } from 'react-i18next'
import { Icons } from '@/components/icons'
import {
  Avatar,
  Button,
  Divider,
  FixedLayout,
  Input,
  Modal,
  Placeholder,
  Tappable, Textarea, VisuallyHidden
} from '@telegram-apps/telegram-ui'
import {
  ModalHeader
} from '@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader'
import { useSearchCrypto } from '@/hooks/queries/use-crypto'
import { motion } from 'framer-motion'
import { useDebounceValue } from 'usehooks-ts'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/components/ui/utils'
import { usePlatform } from '@/hooks/use-platfrom'
import { DialogTitle } from '@radix-ui/react-dialog'
import { ANIMATE_CRYPTOS_LIST } from '@/constants'
import { isValidNumericInput, parseNumericInput } from '@/lib/utils'

interface IProps {
  isOpen: boolean;
  isPortfolioEmpty: boolean;
  setIsOpen: (state: boolean) => void;
  onAddCrypto: (
    cryptoId: string,
    quantity: number,
    purchase: number,
    notice?: string
  ) => void;
}

export function SearchCryptoSkeleton() {
  return (
    <div className="flex items-center gap-4 px-4 py-2">
      <Skeleton className="h-[28px] w-[28px] rounded-full" />
      <Skeleton className="h-[10px] w-[60px]" />
      <Skeleton className="h-[10px] w-[28px]" />
    </div>
  )
}

export const AddCrypto: React.FC<IProps> = (
  {
    onAddCrypto,
    isOpen,
    setIsOpen,
    isPortfolioEmpty
  }) => {
  const [quantity, setQuantity] = useState('')
  const [purchase, setPurchase] = useState('')
  const [notice, setNotice] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [selectedCrypto, setSelectedCrypto] = useState<ICrypto | null>(null)
  const [debouncedSearchValue] = useDebounceValue(searchValue, 300)
  const [initialHeight, setInitialHeight] = useState(0);

  const platform = usePlatform()
  const { t } = useTranslation()

  const isFormCompleted = quantity && purchase && selectedCrypto

  const cryptoQueryParams = useMemo(
    () => ({
      query: debouncedSearchValue || '',
      pageParam: 1,
      limit: 50
    }),
    [debouncedSearchValue]
  )

  const {
    data: cryptos,
    isLoading: isCryptosLoading,
    isFetching: isCryptosFetching
  } = useSearchCrypto(cryptoQueryParams)

  const handleChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/(\..*?)\./g, '$1')

    if (!isValidNumericInput(value)) return
    if (value[0] === '0') return setQuantity(value.replace(',', '.'))
    if (value[0] === '.' || value[0] === ',') return setQuantity('')

    setQuantity(value)
  }

  const handleChangePurchase = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/(\..*?)\./g, '$1')

    if (!isValidNumericInput(value)) return
    if (value[0] === '0') return setPurchase(value.replace(',', '.'))
    if (value[0] === '.' || value[0] === ',') return setPurchase('')

    setPurchase(value)
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

      const numericQuantity = parseNumericInput(quantity)
      const purchasePrice = parseNumericInput(purchase)

      if (
        isNaN(numericQuantity) ||
        numericQuantity <= 0 ||
        isNaN(purchasePrice) ||
        purchasePrice <= 0
      ) {
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

  useEffect(() => {
    if (isOpen) {
      // Сохраняем высоту до того как iOS начнёт её ломать
      setInitialHeight(window.innerHeight);
    }
  }, [isOpen]);

  return (
    <Modal
      style={{
        minHeight: initialHeight * 0.5 + "px",
        height: initialHeight * 0.5 + "px",
      }}
      open={isOpen}
      dismissible={!isPortfolioEmpty}
      onOpenChange={setIsOpen}
      header={<ModalHeader />}
      trigger={
        <FixedLayout
          vertical="bottom"
          className={cn('flex justify-center',
            (platform === 'macos') && '!bottom-18' ||
            (platform === 'ios') && '!bottom-22' ||
            '!bottom-24'
          )}
        >
          <Button size="m">
            <CirclePlus
              className={
                'w-9 h-9 cursor-pointer text-foreground transition-colors'
              }
            />
          </Button>
        </FixedLayout>
      }
      className="!bg-base-background !min-h-[50dvh] !z-50 shadow-[0_0_0_2px_rgba(255,255,255,0.1)]"
    >
      <VisuallyHidden>
        <DialogTitle>
          Add Portfolio Modal
        </DialogTitle>
      </VisuallyHidden>

      <Placeholder header={t('add_crypto.add_coin')} />

      <form className={cn('w-full flex flex-col gap-6 items-center justify-between px-3', platform === 'ios' ? 'pb-5' : 'pb-3')}>
        {selectedCrypto ? (
          <div
            className={cn('relative flex items-center justify-between w-full px-3 py-4 h-[48px] !bg-neutral-04 rounded-xl',
              !(platform === 'ios' || platform === 'macos') && 'shadow-[0_0_0_2px_rgba(255,255,255,0.1)]'
            )}>
            <div className="flex items-center gap-3">
              <div className="rounded-full overflow-hidden">
                <Avatar
                  size={28}
                  src={selectedCrypto.image}
                  alt={selectedCrypto.name}
                  className="!bg-transparent"
                />
              </div>

              <div className={'flex-col'}>
                <p className="text-xs text-foreground ">
                  {selectedCrypto.symbol.toUpperCase()}
                </p>
                <p className="text-[8px] text-neutral-03">
                  {selectedCrypto.name}
                </p>
              </div>
            </div>

            <Tappable
              Component="div"
              className="bg-neutral-04  rounded-xl mr-1"
              onClick={handleRemoveCrypto}
            >
              <Icons.close />
            </Tappable>
          </div>
        ) : (
          <div className="relative w-full">
            <Input
              autoFocus={true}
              type={'text'}
              inputMode={'text'}
              placeholder={t('add_crypto.choose')}
              value={searchValue}
              lang={'en'}
              onChange={(e) => setSearchValue(e.target.value)}
              after={searchValue ? (
                  <Tappable
                    Component="div"
                    className="bg-neutral-04 rounded-xl"
                    onClick={() => setSearchValue('')}
                  >
                    <Icons.close />
                  </Tappable>
                ) :
                <Icons.question
                  onClick={() => alert('Search for a coin by name or symbol. Example: Bitcoin, BTC')}
                  className="size-5 mr-0.5 text-neutral-03 cursor-pointer duration-200 transition-opacity ease-out hover:opacity-80"
                />
              }
              className="!bg-neutral-04"
            />

            {searchValue && (
              <div className="absolute top-14 mb-2 w-full z-10 border-neutral-04 border rounded-xl overflow-hidden">
                <div className="bg-base-background rounded-xl shadow-md max-h-[35dvh] overflow-y-auto">
                  {isCryptosLoading || isCryptosFetching ? (
                    new Array(8).fill(null).map((_, index) => (
                      <SearchCryptoSkeleton key={index} />
                    ))
                  ) : (
                    cryptos?.map((crypto) => {
                      const isPercentagePositive = crypto?.price_change_percentage_24h >= 0
                      const currentPercentage = crypto?.price_change_percentage_24h?.toFixed(2) || 0

                      return (
                        <React.Fragment key={crypto.id}>
                          <motion.div
                            initial={ANIMATE_CRYPTOS_LIST.initial}
                            animate={ANIMATE_CRYPTOS_LIST.animate}
                            exit={ANIMATE_CRYPTOS_LIST.exit}
                            transition={ANIMATE_CRYPTOS_LIST.transition}
                            className="flex justify-between items-center px-4 py-2 hover:bg-muted-foreground select-none transition-colors duration-100 cursor-pointer hover:bg-neutral-04"
                            onClick={() => handleCryptoSelect(crypto)}
                          >
                            <div
                              className="flex items-center gap-3"
                            >
                              <div className="rounded-full overflow-hidden">
                                <Avatar
                                  size={28}
                                  src={crypto.image}
                                  alt={crypto.name}
                                  className="!bg-transparent"
                                />
                              </div>

                              <p className="text-[13px] text-nowrap">
                                {crypto.name.length > 18
                                  ? crypto.name.slice(0, 18) + '...'
                                  : crypto.name}{' '}
                                ({crypto.symbol.toUpperCase()})
                              </p>
                            </div>

                            <div
                              className={`w-16 text-[13px] text-right ${isPercentagePositive ? 'text-specials-success' : 'text-specials-danger'}`}
                            >
                              <span className="font-semibold">{currentPercentage} %</span>
                            </div>
                          </motion.div>
                          <Divider />
                        </React.Fragment>
                      )
                    })
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="w-full relative">
          <Input
            type="text"
            placeholder={t('add_crypto.quantity')}
            value={quantity}
            onChange={handleChangeQuantity}
            after={quantity ? (
              <Tappable
                Component="div"
                className="bg-neutral-04  rounded-xl"
                onClick={() => setQuantity('')}
              >
                <Icons.close />
              </Tappable>
            ) : (
              <Icons.question
                onClick={() => alert('Enter your total crypto quantity Example: 123,450.32 or 0.00213')}
                className="size-5 mr-0.5 text-neutral-03 cursor-pointer duration-200 transition-opacity ease-out hover:opacity-80"
              />
            )}
            className="!bg-neutral-04 !w-full"
          />
        </div>

        <div className="w-full relative">
          <Input
            type="text"
            placeholder={t('add_crypto.purchase')}
            value={purchase}
            onChange={handleChangePurchase}
            after={purchase ? (
              <Tappable
                Component="button"
                className="bg-neutral-04 rounded-full"
                onClick={() => setPurchase('')}
              >
                <Icons.close />
              </Tappable>
            ) : (
              <Icons.question
                onClick={() => alert('Enter your crypto purchase price Example: 123,450.32 or 0.00213')}
                className="size-5 mr-0.5 text-neutral-03 cursor-pointer duration-200 transition-opacity ease-out hover:opacity-80"
              />
            )}
            className="!bg-neutral-04 !w-full"
          />
        </div>

        <div className="w-full relative">
          <Textarea
            placeholder={t('add_crypto.note')}
            value={notice}
            onChange={(e) => setNotice(e.target.value)}
            className="!w-full !bg-neutral-04"
          />
        </div>

        <Button
          size="l"
          mode="filled"
          disabled={!isFormCompleted}
          onClick={handleSubmit}
          className={
            'w-full'
          }
        >
          {t('add_crypto.btn')} {selectedCrypto?.symbol?.toUpperCase()}
        </Button>
      </form>
    </Modal>
  )
}
