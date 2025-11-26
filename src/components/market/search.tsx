'use client';

import React from 'react';
import { useSearchStore } from '@/store';
import { useTranslation } from 'react-i18next';
import { Input, Tappable } from '@telegram-apps/telegram-ui'
import { SearchIcon } from 'lucide-react';
import { Icons } from '../icons';

interface IProps {
  searchValue: string;
  setSearchValue: (value: string) => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

export const SearchInput: React.FC<IProps> = ({
  searchValue,
  setSearchValue,
  inputRef,
}) => {
  const { toggleSearch } = useSearchStore();
  const { t } = useTranslation();

  const clearInput = () => {
    setSearchValue('');
    inputRef.current?.focus();
    toggleSearch(false);
  };

  return (
    <div className='flex items-center mt-2'>
      <div className='relative w-full'>
        <div className='bg-neutral-04 z-50 p-2 rounded-xl absolute top-1/2 -translate-y-1/2 left-1 cursor-pointer'>
          <SearchIcon width={24} height={24} className='text-primary' />
        </div>

        <Input
          status='focused'
          ref={inputRef}
          placeholder={t('input_search.search')}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          after={searchValue && (
            <Tappable
              Component='div'
              className='bg-neutral-04  rounded-xl'
              onClick={clearInput}
            >
              <Icons.close />
            </Tappable>
          )}
          className='outline-2 !pl-14 outline-neutral-04 !bg-transparent'
        />
      </div>
    </div>
  );
};
