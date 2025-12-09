import { Icons } from '@/components/icons';
import React from 'react';
import { IconButton } from '@telegram-apps/telegram-ui'

interface IProps {
  isOpen: boolean;
  setIsOpen: (prev: boolean) => void;
  onEdit: (id: string) => void;
  itemId: string;
  onDelete: (id: string) => void;
}

export const PortfolioEdit: React.FC<IProps> = ({
  isOpen,
  setIsOpen,
  onEdit,
  itemId,
  onDelete,
}) => {

  return (
   <div className={'flex flex-col justify-between mt-px gap-5'}>
     <IconButton
       mode='outline'
       size='m'
       onClick={() => onEdit(itemId)}

     >
       <Icons.editV2 className='size-5 text-primary' />
     </IconButton>

     <IconButton
       mode='outline'
       size='m'
       onClick={() => {
         setIsOpen(!isOpen);
         onDelete(itemId);
       }}
     >
       <Icons.delete className='size-5 text-specials-danger' />
     </IconButton>
   </div>
  );
};
