import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Icons } from '@/components/icons'
import { Separator } from '@/components/ui/separator'
import React from 'react'
import { useTranslation } from 'react-i18next'

interface IProps {
  open: boolean
  setOpen: (prev: boolean) => void
  onEdit: (_id: string) => void
  itemId: string
  className?: string
}

export const PortfolioEdit: React.FC<IProps> = ({ open, setOpen, onEdit, itemId }) => {

  const { t } = useTranslation()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={'p-1'}>
        <Icons.edit />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="bg-card border-0 backdrop-blur min-w-[8rem]">
        <DropdownMenuItem
          onClick={() => onEdit(itemId)}
          className={'flex text-sm text-foreground/85 justify-between cursor-pointer'}
        >
          {t('my_portfolio_page.edit')} <Icons.editV2 />
        </DropdownMenuItem>

        <Separator className={'bg-foreground/10 my-1'} />

        <DropdownMenuItem
          className={'flex text-sm text-[#E40505] justify-between cursor-pointer '}
          onClick={() => setOpen(!open)}
        >
          {t('my_portfolio_page.delete')} <Icons.delete/>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
