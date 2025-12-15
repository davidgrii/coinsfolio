'use client'

import React, { useState } from 'react'

import { Container } from '@/components/container'
import {
  Accordion, Badge,
  Cell,
  IconContainer,
  List,
  Section, Select,
} from '@telegram-apps/telegram-ui'
import { Icon28Chat } from '@telegram-apps/telegram-ui/dist/icons/28/chat'
import { Icon28Stats } from '@telegram-apps/telegram-ui/dist/icons/28/stats'
import { Icons } from '@/components'
import { invoice } from '@tma.js/sdk-react'
import { useCreatePremiumInvoice } from '@/hooks/queries/use-premium'
import { PriceAlerts } from '@/components/settings/price-alerts'
import { cn } from '@/components/ui/utils'
import { PercentageAlerts } from '@/components/settings/percentage-alerts'
import { usePortfolio } from '@/hooks/queries/use-portfolio'
import { useTranslation } from 'react-i18next'
import { ActiveAlerts } from '@/components/settings/active-alerts'
import { useSmartAlerts } from '@/hooks/queries/use-smart-alerts'
import { LANGUAGES } from '@/constants'
import { usePlatform } from '@/hooks/use-platfrom'

const MAIN_SETTING_CELLS = [
  {
    key: 'language',
    isDisabled: false,
    Icon: () => (<IconContainer><Icons.globus className="size-7" /></IconContainer>)
  },
  {
    key: 'premium',
    isDisabled: true,
    Icon: () => (<IconContainer><Icons.premium className="size-7" /></IconContainer>)
  },
  {
    key: 'currency',
    isDisabled: true,
    Icon: () => (<IconContainer><Icon28Stats /></IconContainer>)
  },
  {
    key: 'theme',
    isDisabled: true,
    Icon: () => (<IconContainer><Icons.theme className="size-7" /></IconContainer>)
  }
]

const COMMUNITY_CELLS = [
  {
    key: 'community',
    isDisabled: false,
    Icon: () => (<IconContainer><Icons.community /></IconContainer>)
  },
  {
    key: 'about',
    isDisabled: true,
    Icon: () => (<IconContainer><Icon28Chat /></IconContainer>)
  }
]

export default function SettingsPage() {
  const [isExpended, setIsExpended] = useState(false)
  const [isSmartAlertsActive, setIsSmartAlertsActive] = useState(true)

  const [isActiveSmartAlertsOpen, setIsActiveSmartAlertsOpen] = useState(false)
  const [isPriceAlertsOpen, setIsPriceAlertsOpen] = useState(false)
  const [isPercentageAlertsOpen, setIsPercentageAlertsOpen] = useState(false)
  const [isVolatilityAlertsOpen, setIsVolatilityAlertsOpen] = useState(false)

  const { t, i18n } = useTranslation()
  const platform = usePlatform()
  const { data: smartAlerts, isLoading: isSmartAlertsLoading } = useSmartAlerts()
  const { data: portfolio, isLoading: isLoadingPortfolio } = usePortfolio()
  const { mutateAsync: createPremiumInvoice } = useCreatePremiumInvoice()

  const isActiveSmartAlertsListDisabled = smartAlerts?.price_alerts.length === 0 && smartAlerts?.percentage_alerts.length === 0

  const priceAlertsCount = smartAlerts?.price_alerts?.length || 0
  const percentageAlertsCount = smartAlerts?.percentage_alerts?.length || 0
  const volatilityAlertsCount = smartAlerts?.volatility_alerts?.length || 0

  const handlePriceAlertsClick = (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    e.preventDefault()

    if (portfolio?.length === 0) {
      return alert(
        'You need to add some cryptos to your portfolio to use Smart Alerts'
      )
    }

    setIsPriceAlertsOpen(!isPriceAlertsOpen)
  }

  const handlePercentageAlertsClick = (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    e.preventDefault()

    if (portfolio?.length === 0) {
      return alert(
        'You need to add some cryptos to your portfolio to use Smart Alerts'
      )
    }

    setIsPercentageAlertsOpen(!isPercentageAlertsOpen)
  }

  const handleVolatilityAlertsClick = (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    e.preventDefault()

    if (portfolio?.length === 0) {
      return alert(
        'You need to add some cryptos to your portfolio to use Smart Alerts'
      )
    }

    setIsVolatilityAlertsOpen(!isPercentageAlertsOpen)
  }

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value.toLowerCase())
    localStorage.setItem('language', e.target.value.toLowerCase())
  }

  const handleSmartAlertsClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault()

    if (isActiveSmartAlertsListDisabled) {
      return alert(
        'You don\'t have any active smart alerts yet'
      )
    }

    setIsActiveSmartAlertsOpen(!isActiveSmartAlertsOpen)
  }

  const handleClickPremium = async () => {
    const invoiceUrl = await createPremiumInvoice()

    if (invoiceUrl) {
      return invoice.openUrl(invoiceUrl)
    }
  }

  return (
    <Container back={true}>
      <List className="!pt-1 !px-0 grid overflow-y-auto max-h-[76vh] scrollbar-none !pb-[80px]">
        <Accordion
          expanded={isExpended}
          onChange={() => setIsExpended(!isExpended)}
        >
          <Accordion.Summary
            before={
              <IconContainer>
                <Icons.notifications className="size-7" />
              </IconContainer>
            }
            className="bg-neutral-04 rounded-xl"
          >
            {t('settings_page.smart_alerts_cells.smart_alerts')}
          </Accordion.Summary>

          {/*<Cell*/}
          {/*  className="bg-neutral-04 rounded-xl"*/}
          {/*  Component="label"*/}
          {/*  after={*/}
          {/*    <Switch*/}
          {/*      defaultChecked*/}
          {/*      onChange={() => setIsSmartAlertsActive(!isSmartAlertsActive)}*/}
          {/*    />*/}
          {/*  }*/}
          {/*  multiline*/}
          {/*>*/}
          {/*  Turn {isSmartAlertsActive ? 'on' : 'off'} Smart Alerts*/}
          {/*</Cell>*/}

          <Accordion.Content className="!bg-transparent !overflow-hidden">
            <Section
              header={t(`settings_page.smart_alerts_cells.header`)}
              className={cn(
                '!rounded-xl !overflow-hidden !bg-neutral-04',
                isExpended && '!mb-3'
              )}
            >
              <PriceAlerts
                portfolio={portfolio}
                isOpen={isPriceAlertsOpen}
                setIsOpen={setIsPriceAlertsOpen}
                children={
                  <Cell
                    disabled={!isSmartAlertsActive}
                    onClick={(e) => handlePriceAlertsClick(e)}
                    before={
                      <IconContainer>
                        <Icons.price className="size-7" />
                      </IconContainer>
                    }
                    after={priceAlertsCount > 0 && <Badge mode="primary" type="number">{priceAlertsCount}</Badge>}
                  >
                    {t('settings_page.smart_alerts_cells.price_alerts')}
                  </Cell>
                }
              />

              <PercentageAlerts
                portfolio={portfolio}
                isOpen={isPercentageAlertsOpen}
                setIsOpen={setIsPercentageAlertsOpen}
                children={
                  <Cell
                    disabled={!isSmartAlertsActive}
                    onClick={(e) => handlePercentageAlertsClick(e)}
                    before={
                      <IconContainer>
                        <Icons.percent className="size-7" />
                      </IconContainer>
                    }
                    after={percentageAlertsCount > 0 &&
                      <Badge mode="primary" type="number">{percentageAlertsCount}</Badge>}
                  >
                    {t('settings_page.smart_alerts_cells.percentage_alerts')}
                  </Cell>
                }
              />

              {/*<VolatilityAlerts*/}
              {/*  portfolio={portfolio}*/}
              {/*  isOpen={isVolatilityAlertsOpen}*/}
              {/*  setIsOpen={setIsVolatilityAlertsOpen}*/}
              {/*  children={*/}
              {/*    <Cell*/}
              {/*      disabled={!isSmartAlertsActive}*/}
              {/*      onClick={(e) => handleVolatilityAlertsClick(e)}*/}
              {/*      before={*/}
              {/*        <IconContainer>*/}
              {/*          <Icons.volatility className="size-7" />*/}
              {/*        </IconContainer>*/}
              {/*      }*/}
              {/*      after={volatilityAlertsCount > 0 && <Badge mode="primary" type="number">{volatilityAlertsCount}</Badge>}*/}
              {/*    >*/}
              {/*      {t('settings_page.volatility_alerts')}*/}
              {/*    </Cell>*/}
              {/*  }*/}
              {/*/>*/}

              <ActiveAlerts
                isOpen={isActiveSmartAlertsOpen}
                setIsOpen={setIsActiveSmartAlertsOpen}
                children={
                  <Cell
                    disabled={isActiveSmartAlertsListDisabled}
                    onClick={(e) => handleSmartAlertsClick(e)}
                    before={
                      <IconContainer>
                        <Icons.alertsList className="size-7" />
                      </IconContainer>
                    }
                  >
                    {t('settings_page.smart_alerts_cells.active_alerts')}
                  </Cell>
                }
              />
            </Section>
          </Accordion.Content>
        </Accordion>

        <Section
          header={t(`settings_page.main_settings_cells.header`)}
          className="!rounded-xl !overflow-hidden !bg-neutral-04"
        >
          {MAIN_SETTING_CELLS.map(({ key, Icon, isDisabled }, index) => {
              if (key === 'language') {
                return (
                  <div className='group relative overflow-hidden'>
                    <Select
                      id="language"
                      defaultValue={i18n.language.toUpperCase() || 'EN'}
                      onChange={handleLanguageChange}
                      className={cn('!opacity-0 !absolute !right-0 !left-0 !top-0.5 !rounded-none !z-10',
                        platform !== 'ios' && '!h-13'
                      )}
                    >
                      {LANGUAGES.map((lang) => (
                        <option key={lang.code}>{lang.code.toUpperCase()}</option>
                      ))}
                    </Select>

                    <Cell
                      key={index}
                      disabled={isDisabled}
                      before={<Icon />}
                      className='group-hover:bg-[var(--tgui--tertiary_bg_color)]'
                    >
                      {t(`settings_page.main_settings_cells.${key}`)}
                    </Cell>
                  </div>
                )
              }

              return (
                <Cell
                  key={index}
                  disabled={isDisabled}
                  before={<Icon />}
                >
                  {t(`settings_page.main_settings_cells.${key}`)}
                </Cell>
              )
            }
          )}
        </Section>

        <Section
          header={t(`settings_page.community_cells.header`)}
          className="!rounded-xl !overflow-hidden !bg-neutral-04"
        >
          {COMMUNITY_CELLS.map(({ key, Icon, isDisabled }, index) => {
            if (key === 'community') {
              return (
                <a key={index} href={`https://t.me/coninsfolio`}>
                  <Cell
                    disabled={isDisabled}
                    before={<Icon />}
                  >
                    {t(`settings_page.community_cells.${key}`)}
                  </Cell>
                </a>
              )
            }

            return (
              <Cell
                key={index}
                disabled={isDisabled}
                before={<Icon />}
              >
                {t(`settings_page.community_cells.${key}`)}
              </Cell>
            )
          })}
        </Section>
      </List>
    </Container>
  )
}
