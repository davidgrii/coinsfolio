'use client'

import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  Card,
  CardContent
} from '@/components/ui/card'
import { Avatar, Caption, Divider, Headline, Select, Subheadline } from '@telegram-apps/telegram-ui'
import { useUser } from '@/app/_providers/user-provider'

export const SettingsDashboard = () => {
  const { user } = useUser()
  const { t, i18n } = useTranslation()

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value.toLowerCase())
    localStorage.setItem('language', e.target.value.toLowerCase())
  }

  if (!user) return null

  return (
    <div className="relative">
      <Card
        className={
          'bg-neutral-04 py-4 px-5 items-center justify-between rounded-xl border-0 cursor-pointer select-none'
        }
      >
        <CardContent className="flex justify-between p-0">
          <div className={'flex items-center gap-3'}>
            <div className="rounded-full overflow-hidden">
              <Avatar
                size={48}
                src={user.photo_url || '/assets/images/avatar.png'}
                alt={user.username || 'Avatar'}
                className="!bg-transparent"
              />
            </div>

            <div className="flex flex-col">
              <Subheadline
                weight="2"
              >
                {user.username || user.first_name}
              </Subheadline>
              <Caption
                level="2"
                weight="3"
                className="text-neutral-03"
              >
                Premium: 30 days
              </Caption>
            </div>
          </div>

          <Select
            defaultValue={i18n.language.toUpperCase() || 'EN'}
            onChange={handleLanguageChange}
          >
            <option>EN</option>
            <option>RU</option>
            <option>UK</option>
          </Select>
        </CardContent>
      </Card>
    </div>
  )
}
