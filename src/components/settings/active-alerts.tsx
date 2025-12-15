import React, { useEffect, useState } from 'react'
import {
  Button, Caption, Cell, Checkbox,
  Modal,
  Placeholder,
  Section, Spinner, Subheadline,
  VisuallyHidden
} from '@telegram-apps/telegram-ui'
import {
  ModalHeader
} from '@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader'
import { cn } from '@/components/ui/utils'
import { usePlatform } from '@/hooks/use-platfrom'
import { DialogTitle } from '@radix-ui/react-dialog'
import {
  useDeleteSmartAlert, useSmartAlerts
} from '@/hooks/queries/use-smart-alerts'
import { useTranslation } from 'react-i18next'
import { usePortfolio } from '@/hooks/queries/use-portfolio'

interface IProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children: React.ReactNode;
}

export const ActiveAlerts: React.FC<IProps> = (
  {
    isOpen,
    setIsOpen,
    children
  }) => {
  const platform = usePlatform()
  const { t } = useTranslation()

  const { data: smartAlerts, isLoading: isSmartAlertsLoading } = useSmartAlerts()
  const { mutate: deleteSmartAlertMutation, isPending: isDeleteSmartAlertPending } = useDeleteSmartAlert()

  const [selectedAlert, setSelectedAlert] = useState({
    alertId: '',
    alertType: ''
  })

  const priceAlerts = smartAlerts?.price_alerts || []
  const percentageAlerts = smartAlerts?.percentage_alerts || []
  const isSelectedAlertId = selectedAlert.alertId

  const handleAlertClick = (id: string, type: string) => {
    if (selectedAlert.alertId === id) return setSelectedAlert({ alertId: '', alertType: '' })

    setSelectedAlert({ alertId: id, alertType: type })
  }

  const handleSubmit = () => {
    const data = {
      alertId: selectedAlert.alertId,
      alertType: selectedAlert.alertType
    }

    deleteSmartAlertMutation({ data: data }, {
      onSuccess: () => {
        setSelectedAlert({
          alertId: '',
          alertType: ''
        })
      }
    })
  }

  useEffect(() => {
    if (priceAlerts.length === 0 && percentageAlerts.length === 0) {
      setIsOpen(false)
    }
  }, [percentageAlerts, priceAlerts, isSmartAlertsLoading, setIsOpen])

  return (
    <Modal
      open={isOpen}
      onOpenChange={setIsOpen}
      header={<ModalHeader />}
      trigger={children}
      className="!bg-base-background backdrop-blur-lg !z-50 shadow-[0_0_0_2px_rgba(255,255,255,0.1)]"
    >
      <VisuallyHidden>
        <DialogTitle>Add Portfolio Modal</DialogTitle>
      </VisuallyHidden>

      <Placeholder header={t('settings_page.smart_alerts_modals.active_alerts.title')} />

      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit()
        }}
        className={cn(
          'w-full flex flex-col gap-6 items-center justify-between px-3',
          platform === 'ios' ? 'pb-5' : 'pb-3'
        )}
      >
        {priceAlerts.length > 0 ? (
          <Section
            header={t('settings_page.smart_alerts_modals.active_alerts.price_alert_title')}
            className="!rounded-xl !overflow-hidden !bg-neutral-04 !w-full select-none"
          >
            {priceAlerts.map(({ id, cryptoId, price, condition_type }, index) => (
              <Cell
                key={id}
                before={
                  <div className="flex items-center gap-2">
                    <p className="text-sm">
                      {cryptoId.length > 10
                        ? `${cryptoId.slice(0, 8).toUpperCase()}...`
                        : cryptoId.toUpperCase()
                      }
                    </p>
                  </div>
                }
                after={<Checkbox name="checkbox" readOnly checked={id === selectedAlert.alertId} />}
                onClick={(e) => {
                  e.preventDefault()
                  handleAlertClick(id, 'price')
                }}
              >
                <div className="flex items-center  justify-between gap-2">
                  <Caption>
                    {condition_type === 'above' ? t('settings_page.smart_alerts_modals.active_alerts.condition_type_above') : t('settings_page.smart_alerts_modals.active_alerts.condition_type_below')}
                  </Caption>
                  —
                  <Subheadline level="1">
                    {price}$
                  </Subheadline>
                </div>
              </Cell>
            ))}
          </Section>
        ) : null}

        {percentageAlerts.length > 0 ? (
          <Section
            header={t('settings_page.smart_alerts_modals.active_alerts.percentage_alert_title')}
            className="!rounded-xl !overflow-hidden !bg-neutral-04 !w-full select-none"
          >
            {percentageAlerts.map(({ id, cryptoId, percentage, condition_type }) => (
              <Cell
                key={id}
                before={
                  <div className="grid gap-0.5">
                    <p className="text-sm leading-none">
                      {cryptoId.length > 10
                        ? `${cryptoId.slice(0, 8).toUpperCase()}...`
                        : cryptoId.toUpperCase()
                      }
                    </p>
                  </div>
                }
                after={<Checkbox name="checkbox" readOnly checked={id === selectedAlert.alertId} />}
                onClick={(e) => {
                  e.preventDefault()
                  handleAlertClick(id, 'percentage')
                }}
              >
                {condition_type === 'above' ? `+${percentage}%` : `-${percentage}%`}
              </Cell>
            ))}
          </Section>
        ) : null}

        <Button
          size="l"
          mode="filled"
          type="submit"
          disabled={!isSelectedAlertId}
          className="w-full"
        >
          {isDeleteSmartAlertPending ?
            <Spinner size="s" /> : t('settings_page.smart_alerts_modals.active_alerts.button')}
        </Button>
      </form>
    </Modal>
  )
}
