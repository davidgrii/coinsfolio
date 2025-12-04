import React from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { useSearchStore } from '@/store';
import { motion } from 'framer-motion';
import { Icons } from '@/components';

interface IProps {
  isSearchEnabled?: boolean;
}

export const CryptoTableHeader: React.FC<IProps> = ({
  isSearchEnabled = false,
}) => {
  const { t } = useTranslation();
  const { toggleSearch, isSearchOpen } = useSearchStore();

  return (
    <>
      {isSearchEnabled ? (
        <div
          className={clsx(
            'flex justify-between text-[12.5px] font-medium text-neutral-03 my-3',
          )}
        >
          <div className='flex gap-5'>
            <span>{t('table_header.rank')}</span>
            <span>{t('table_header.coin')}</span>
          </div>

          <div className='flex mr-1 items-center'>
            <div className='flex gap-8 mr-5'>
              <span>{t('table_header.price')}</span>
              <span className='w-12 text-right'>
                {t('table_header.change')}
              </span>
            </div>

            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className='cursor-pointer'
              onClick={() => toggleSearch(true)}
            >
              <Icons.search className={'!w-[18px] !h-[18px]'} />
            </motion.span>
          </div>
        </div>
      ) : (
        <div
          className={`flex justify-between text-[12.5px] font-medium text-neutral-03 mt-3 mb-4 mr-3.5`}
        >
          <div className='flex gap-5'>
            <span>{t('table_header.rank')}</span>
            <span>{t('table_header.coin')}</span>
          </div>

          <div className='flex gap-8 mr-[25px]'>
            <span>{t('table_header.price')}</span>

            <span className={'w-12 text-right'}>
              {t('table_header.change')}
            </span>
          </div>
        </div>
      )}
    </>
  );
};
