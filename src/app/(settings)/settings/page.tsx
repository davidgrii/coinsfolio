'use client'

import React, { useState } from 'react'

import { Container } from '@/components/container'
import {
  Accordion, Badge,
  Cell,
  IconContainer,
  List,
  Section,
  Switch
} from '@telegram-apps/telegram-ui'
import { Icon28Chat } from '@telegram-apps/telegram-ui/dist/icons/28/chat'
import { Icon28Stats } from '@telegram-apps/telegram-ui/dist/icons/28/stats'
import { Icons } from '@/components'
import { invoice } from '@tma.js/sdk-react'
import { useCreatePremiumInvoice } from '@/hooks/queries/use-premium'
import { PriceAlerts } from '@/components/settings/price-alerts'
import { cn } from '@/components/ui/utils'
import { PercentageAlerts } from '@/components/settings/percentage-alerts'
import { VolatilityAlerts } from '@/components/settings/volatility-alerts'
import { usePortfolio } from '@/hooks/queries/use-portfolio'
import { useTranslation } from 'react-i18next'
import { ActiveSmartAlerts } from '@/components/settings/active-smart-alerts'

export default function SettingsPage() {
  const [isExpended, setIsExpended] = useState(false)
  const [isSmartAlertsActive, setIsSmartAlertsActive] = useState(true)

  const [isActiveSmartAlertsOpen, setIsActiveSmartAlertsOpen] = useState(false)
  const [isPriceAlertsOpen, setIsPriceAlertsOpen] = useState(false)
  const [isPercentageAlertsOpen, setIsPercentageAlertsOpen] = useState(false)
  const [isVolatilityAlertsOpen, setIsVolatilityAlertsOpen] = useState(false)

  const { t } = useTranslation()
  const { data: portfolio, isLoading: isLoadingPortfolio } = usePortfolio()
  const { mutateAsync: createPremiumInvoice } = useCreatePremiumInvoice()

  const handlePriceAlertsClick = (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    e.preventDefault()

    // if (portfolio?.length === 0) {
    //   return alert(
    //     'You need to add some cryptos to your portfolio to use Smart Alerts'
    //   )
    // }
    //
    // setIsPriceAlertsOpen(!isPriceAlertsOpen)
  }

  const handlePercentageAlertsClick = (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    e.preventDefault()

    // if (portfolio?.length === 0) {
    //   return alert(
    //     'You need to add some cryptos to your portfolio to use Smart Alerts'
    //   )
    // }
    //
    // setIsPercentageAlertsOpen(!isPercentageAlertsOpen)
  }

  const handleVolatilityAlertsClick = (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    e.preventDefault()

    // if (portfolio?.length === 0) {
    //   return alert(
    //     'You need to add some cryptos to your portfolio to use Smart Alerts'
    //   )
    // }
    //
    // setIsVolatilityAlertsOpen(!isPercentageAlertsOpen)
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
            {t('settings_page.smart_alerts')}
          </Accordion.Summary>

          <Cell
            className="bg-neutral-04 rounded-xl"
            Component="label"
            after={
              <Switch
                defaultChecked
                onChange={() => setIsSmartAlertsActive(!isSmartAlertsActive)}
              />
            }
            multiline
          >
            Turn {isSmartAlertsActive ? 'on' : 'off'} Smart Alerts
          </Cell>

          <Accordion.Content className="!bg-transparent !overflow-hidden">
            <Section
              header="Smart Alerts"
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
                    disabled
                    onClick={(e) => handlePriceAlertsClick(e)}
                    before={
                      <IconContainer>
                        <Icons.price className="size-7" />
                      </IconContainer>
                    }
                    after={
                      <>
                        <Badge mode="primary" type="number">3</Badge>
                      </>
                    }
                  >
                    {t('settings_page.price_alerts')}
                  </Cell>
                }
              />

              <PercentageAlerts
                portfolio={portfolio}
                isOpen={isPercentageAlertsOpen}
                setIsOpen={setIsPercentageAlertsOpen}
                children={
                  <Cell
                    disabled
                    onClick={(e) => handlePercentageAlertsClick(e)}
                    before={
                      <IconContainer>
                        <Icons.percent className="size-7" />
                      </IconContainer>
                    }
                    after={<Badge mode="primary" type="number">3</Badge>}
                  >
                    {t('settings_page.percentage_alerts')}
                  </Cell>
                }
              />

              <VolatilityAlerts
                portfolio={portfolio}
                isOpen={isVolatilityAlertsOpen}
                setIsOpen={setIsVolatilityAlertsOpen}
                children={
                  <Cell
                    disabled
                    onClick={(e) => handleVolatilityAlertsClick(e)}
                    before={
                      <IconContainer>
                        <Icons.volatility className="size-7" />
                      </IconContainer>
                    }
                    after={<Badge mode="primary" type="number">3</Badge>}
                  >
                    {t('settings_page.volatility_alerts')}
                  </Cell>
                }
              />

              <ActiveSmartAlerts
                portfolio={portfolio}
                isOpen={isActiveSmartAlertsOpen}
                setIsOpen={setIsActiveSmartAlertsOpen}
                children={
                  <Cell
                    disabled
                    onClick={(e) => {
                      e.preventDefault()
                    }}
                    before={
                      <IconContainer>
                        <Icons.alertsList className="size-7" />
                      </IconContainer>
                    }
                  >
                    Active Smart Alerts
                  </Cell>
                }
              />
            </Section>
          </Accordion.Content>
        </Accordion>

        <Section
          header="Main Settings"
          className="!rounded-xl !overflow-hidden !bg-neutral-04"
        >
          <Cell
            disabled
            before={
              <IconContainer>
                <Icons.premium className="size-[24px] m-0.5" />
              </IconContainer>
            }
          >
            Premium (Soon)
          </Cell>
          <Cell
            disabled
            before={
              <IconContainer>
                <Icon28Stats />
              </IconContainer>
            }
          >
            Currency (Soon)
          </Cell>
          <Cell
            disabled
            before={
              <IconContainer>
                <Icons.theme className="size-7" />
              </IconContainer>
            }
          >
            Theme (Soon)
          </Cell>
        </Section>

        <Section
          header="Addetonational"
          className="!rounded-xl !overflow-hidden !bg-neutral-04"
        >
          <a href={`https://t.me/coninsfolio`}>
            <Cell
              before={
                <IconContainer>
                  <Icons.community />
                </IconContainer>
              }
            >
              Community
            </Cell>
          </a>
          <Cell
            disabled
            before={
              <IconContainer>
                <Icon28Chat />
              </IconContainer>
            }
          >
            About (Soon)
          </Cell>
        </Section>
      </List>
    </Container>
  )
}
