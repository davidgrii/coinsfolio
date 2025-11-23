import React from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Icons } from '@/components/icons'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'

interface IProps {
  cryptoId: string
  className?: string
}

export const MoreCryptoInfo: React.FC<IProps> = ({ cryptoId }) => {

  const { t } = useTranslation()

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Icons.marketDetails className={'w-5 h-5'} />
      </AlertDialogTrigger>

      <AlertDialogContent className={'max-w-80 -mr-5 pl-5'}>
        <AlertDialogHeader>
          <AlertDialogTitle className={'text-center text-[16px]'}>
            {t('crypto_details_popup.coingeko_info.title')}
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            className={'bg-[#1C1C1E] border-0 text-foreground w-20 h-9 hover:bg-card focus-visible:ring-0 focus-visible:ring-offset-0 active:border-0 hover:text-foreground rounded-lg'}
          >
            {t('crypto_details_popup.coingeko_info.disagree')}
          </AlertDialogCancel>

          <AlertDialogAction
            className={'bg-[#007BFF] border-0 w-28 h-9 text-foreground rounded-lg hover:bg-[#007BFF]/80'}
          >
            <Link
              className="p-1 flex items-end gap-1"
              href={`https://www.coingecko.com/en/coins/${cryptoId}`}
              target={'_blank'}
            >
              {t('crypto_details_popup.coingeko_info.agree')}
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                   className="icon icon-tabler icons-tabler-outline icon-tabler-external-link">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6" />
                <path d="M11 13l9 -9" />
                <path d="M15 4h5v5" />
              </svg>
            </Link>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

