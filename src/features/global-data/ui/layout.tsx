import React from 'react'

interface IProps {
  dashboard: React.ReactNode
  className?: string
}

export const Layout: React.FC<IProps> = ({ dashboard, className }) => {

  return (
    <div className={'max-w-3xl mx-auto p-3'}>
      {dashboard}
    </div>
  )
}
