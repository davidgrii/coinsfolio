import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Icons } from '@/components/icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Divider } from '@telegram-apps/telegram-ui';

interface IProps {
  open: boolean;
  setOpen: (prev: boolean) => void;
  onEdit: (_id: string) => void;
  itemId: string;
  onDelete: (_id: string) => void;
}

export const PortfolioEdit: React.FC<IProps> = ({
  open,
  setOpen,
  onEdit,
  itemId,
  onDelete,
}) => {
  const { t } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={'p-1'}>
        <Icons.edit />
      </DropdownMenuTrigger>

      <DropdownMenuContent className='bg-base-background rounded-xl border border-neutral-04 min-w-[8rem]'>
        <DropdownMenuItem
          onClick={() => onEdit(itemId)}
          className={'flex text-sm text-primary justify-between cursor-pointer'}
        >
          {t('my_portfolio_page.edit')} <Icons.editV2 className='size-5' />
        </DropdownMenuItem>

        <Divider className='!border-neutral-04 !border-1' />

        <DropdownMenuItem
          className={
            'flex text-sm text-specials-danger justify-between cursor-pointer '
          }
          onClick={() => {
            setOpen(!open);
            onDelete(itemId);
          }}
        >
          {t('my_portfolio_page.delete')} <Icons.delete className='size-5' />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
