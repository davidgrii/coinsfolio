import { SegmentedControl } from '@telegram-apps/telegram-ui'
import React from 'react'

interface IProps {
  onChange: (value: string) => void;
}

export const PortfolioSwitcher = () => {
  return (
    <SegmentedControl className='!bg-neutral-04 !p-1 !rounded-xl !h-11'>
      <SegmentedControl.Item
        onClick={() => alert('This feature is coming')}
        selected
      >
        Portfolio 1
      </SegmentedControl.Item>

      <SegmentedControl.Item
        onClick={() => alert('This feature is coming')}
      >
        Portfolio 2
      </SegmentedControl.Item>

      <SegmentedControl.Item
        onClick={() => alert('This feature is coming')}
      >
        Portfolio 3
      </SegmentedControl.Item>
    </SegmentedControl>
  )
}