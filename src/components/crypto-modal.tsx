'use client'

import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Icons } from './icons'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export const CryptoModal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  useEffect(() => {
    if (isOpen) {
      document.body.style.position = 'fixed'
      document.body.style.top = `-${window.scrollY}px`
    } else {
      const scrollY = document.body.style.top
      document.body.style.position = ''
      document.body.style.top = ''
      window.scrollTo(0, parseInt(scrollY || '0') * -1)
    }

    return () => {
      document.body.style.position = ''
      document.body.style.top = ''
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      document.body.style.position = 'fixed'
      document.body.style.top = `-${window.scrollY}px`
    }

    return () => {
      const scrollY = document.body.style.top
      document.body.style.position = ''
      document.body.style.top = ''
      window.scrollTo(0, parseInt(scrollY || '0') * -1)
    }
  }, [isOpen])

  const safeOnClose = () => {
    if (isOpen) onClose()
  }

  if (!isOpen) return null

  if (typeof window === 'undefined') return null

  return ReactDOM.createPortal(
    <div
      className="fixed w-full h-full inset-0 z-50 flex items-start justify-center bg-[#1C1C1E] bg-opacity-70"
      onClick={safeOnClose}
      onTouchStart={(e) => e.stopPropagation()}
    >
      <div
        className="w-full max-w-3xl rounded-lg overflow-hidden relative p-4 pt-11"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute right-3 top-2.5 text-gray-500 hover:text-white"
          onClick={safeOnClose}
        >
          <Icons.Close />
        </button>
        {children}
      </div>
    </div>,
    document.body
  )
}
