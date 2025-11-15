import React from 'react'


interface IProps {
  nav: React.ReactNode
  className?: string
}

export const Layout: React.FC<IProps> = ({ nav, className }) => {
  return (
    <div className={'flex z-50 justify-center bg-background w-full fixed bottom-0 left-0'}>
      {nav}
    </div>
  )
}
