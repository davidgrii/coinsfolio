'use client'

import React, { useState } from 'react'

import { Container } from '@/components/container'
import { Accordion, Cell, IconContainer, List, Section } from '@telegram-apps/telegram-ui'
import { Icon28Chat } from '@telegram-apps/telegram-ui/dist/icons/28/chat'
import { Icon28Stats } from '@telegram-apps/telegram-ui/dist/icons/28/stats'
import { Icons } from '@/components'
import { invoice } from '@tma.js/sdk-react'
import { useCreatePremiumInvoice } from '@/hooks/queries/use-premium'
import { PriceAlerts } from '@/components/settings/price-alerts'
import { cn } from '@/components/ui/utils'
import { PercentageAlerts } from '@/components/settings/percentage-alerts'
import { VolatilityAlerts } from '@/components/settings/volatility-alerts'

export default function SettingsPage() {
  const [isPriceAlertsOpen, setIsPriceAlertsOpen] = useState(false)
  const [isExpended, setIsExpended] = useState(false)

  const { mutateAsync: createPremiumInvoice } = useCreatePremiumInvoice()

  const handleClickPremium = async () => {
    const invoiceUrl = await createPremiumInvoice()

    if (invoiceUrl) {
      return invoice.openUrl(invoiceUrl)
    }
  }

  return (
    <Container back={true}>
      <List
        className="!pt-2 !px-0 grid overflow-y-auto max-h-[76vh] scrollbar-none "
      >
        <Accordion
          expanded={isExpended}
          onChange={() => setIsExpended(!isExpended)}
        >
          <Accordion.Summary
            before={<IconContainer><Icons.notifications className="size-7" /></IconContainer>}
            className='bg-neutral-04 rounded-xl'
          >
            <span>Smart Alerts</span>
          </Accordion.Summary>

          <Accordion.Content className="!bg-transparent !overflow-hidden">
            <Section
              header="Smart Alerts"
              className={cn('!rounded-xl !overflow-hidden !bg-neutral-04', isExpended && '!mb-3')}
            >
              <PriceAlerts
                isOpen={isPriceAlertsOpen}
                setIsOpen={setIsPriceAlertsOpen}
                children={
                  <Cell
                    before={<IconContainer><Icons.price className="size-7" /></IconContainer>}>
                    Price Alerts
                  </Cell>
                }
              />

              <PercentageAlerts
                isOpen={isPriceAlertsOpen}
                setIsOpen={setIsPriceAlertsOpen}
                children={
                  <Cell
                    before={<IconContainer><Icons.percent className="size-7" /></IconContainer>}>
                    Percentage Alerts
                  </Cell>
                }
              />

              <VolatilityAlerts
                isOpen={isPriceAlertsOpen}
                setIsOpen={setIsPriceAlertsOpen}
                children={
                  <Cell
                    before={<IconContainer><Icons.volatility className="size-7" /></IconContainer>}>
                    Volatility Alerts
                  </Cell>
                }
              />
            </Section>
          </Accordion.Content>
        </Accordion>

        <Section
          header="Main Settings"
          className="!rounded-xl !overflow-hidden !bg-neutral-04 -mt-3"
        >
          <Cell
            onClick={handleClickPremium}
            before={<IconContainer><Icons.premium className="size-[24px] m-0.5" /></IconContainer>}
          >
            Premium
          </Cell>
          <Cell
            disabled
            before={<IconContainer><Icon28Stats /></IconContainer>}>
            Currency (Soon)
          </Cell>
          <Cell
            disabled
            before={<IconContainer><Icons.theme className="size-7" /></IconContainer>}>
            Theme (Soon)
          </Cell>
        </Section>

        <Section
          header="Addetonational"
          className="!rounded-xl !overflow-hidden !bg-neutral-04"
        >
          <a href={`https://t.me/coninsfolio`}>
            <Cell
              before={<IconContainer><Icons.community /></IconContainer>}>
              Community
            </Cell>
          </a>
          <Cell
            disabled
            before={<IconContainer><Icon28Chat /></IconContainer>}>
            About (Soon)
          </Cell>
        </Section>
      </List>
    </Container>
  )
}
