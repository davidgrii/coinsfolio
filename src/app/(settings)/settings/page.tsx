'use client';

import React from 'react';


import { Container } from '@/components/container';
import { Cell, IconContainer, Input, List, Section } from '@telegram-apps/telegram-ui'
import { useUser } from '@/app/_providers/user-provider'
import { Icon28Chat } from '@telegram-apps/telegram-ui/dist/icons/28/chat'
import { Icon28Devices } from '@telegram-apps/telegram-ui/dist/icons/28/devices'
import { Icon28Stats } from '@telegram-apps/telegram-ui/dist/icons/28/stats'

export default function SettingsPage() {
  const { userId } = useUser();

  return (
    <Container back={true}>
      <List
        className='scrollbar-none !pt-0 !px-0'
      >
        <Section
          footer=""
          header="Main Settings"
        >
          <Cell before={<IconContainer><Icon28Chat /></IconContainer>}>
            Notifications
          </Cell>
          <Cell before={<IconContainer><Icon28Devices /></IconContainer>}>
            Premium
          </Cell>
          <Cell before={<IconContainer><Icon28Stats /></IconContainer>}>
            Currency
          </Cell>
        </Section>

        <Section
          footer=""
          header="Appereance Settings"
        >
          <Cell before={<IconContainer><Icon28Chat /></IconContainer>}>
            Theme
          </Cell>
          <Cell before={<IconContainer><Icon28Stats /></IconContainer>}>
            About
          </Cell>
        </Section>
      </List>
    </Container>
  );
}
