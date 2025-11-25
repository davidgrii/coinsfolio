import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface IProps {
  open: boolean;
  setOpen: (prev: boolean) => void;
  itemId: string;
  onDelete: (cryptoId: string) => void;
}

export const PortfolioConfirm: React.FC<IProps> = ({
  open,
  setOpen,
  itemId,
  onDelete,
}) => {
  const { t } = useTranslation();

  return (
    <AlertDialog open={open} onOpenChange={() => setOpen(false)}>
      <AlertDialogContent className={'max-w-80 -mr-5 pl-5'}>
        <AlertDialogHeader>
          <AlertDialogTitle className={'text-center text-[16px]'}>
            {t('my_portfolio_page.are_agree')}
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            className={
              'bg-[#1C1C1E] border-0 text-foreground w-20 h-9 hover:bg-card hover:text-foreground rounded-lg'
            }
          >
            {t('my_portfolio_page.disagree')}
          </AlertDialogCancel>
          <AlertDialogAction
            className={
              'bg-[#1C1C1E] border-0 w-20 h-9 text-secondary hover:bg-card rounded-lg'
            }
            onClick={() => onDelete(itemId)}
          >
            {t('my_portfolio_page.agree_btn')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
