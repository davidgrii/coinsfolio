import React, { useEffect } from 'react'
import { GiftIcon } from 'lucide-react'

interface IProps {
  currentPage: string
  show: boolean
  setShow: (show: boolean) => void
  className?: string
}

export const Gift: React.FC<IProps> = ({ currentPage, show, setShow, className }) => {

  useEffect(() => {
    const giftShown = localStorage.getItem('giftShown')

    if (!giftShown && currentPage !== '/friends') {
      setShow(true)
    }

    if (currentPage === '/friends' && !giftShown) {
      localStorage.setItem('giftShown', 'true')
    }
  }, [currentPage, setShow])

  return (
    <>
      {show &&
        <div
          className={'absolute animate-bounce bg-background/10 backdrop-blur-sm rounded-full p-1 -top-4 text-sm flex items-center gap-0.5'}>
          +3000 <GiftIcon width={14} height={14} />
          <div className="relative -top-2 flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#007BFF]"></span>
          </div>
        </div>
      }
    </>
  )
}
