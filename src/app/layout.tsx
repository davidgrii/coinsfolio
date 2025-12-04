import React from 'react';
import './globals.css';
import type { Metadata } from 'next';
import { cn } from '@/components/ui/utils';
import QueryProvider from '@/app/_providers/query-provider';
import { Analytics } from '@vercel/analytics/next';
import '@telegram-apps/telegram-ui/dist/styles.css';
import { TelegramProvider } from '@/app/_providers/telegram-provider';
import { UserProvider } from '@/app/_providers/user-provider'
import { I18nProvider } from '@/app/_providers/i18n-provider'

export const metadata: Metadata = {
  title: 'Coins Folio',
  description: 'Developed by | david_gri',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang='en'>
      <body
        className={cn(`bg-base-background overflow-hidden`)}
      >
        <QueryProvider>
          <I18nProvider>
            <TelegramProvider>
              <UserProvider>
                {children}
              </UserProvider>
            </TelegramProvider>
          </I18nProvider>
        </QueryProvider>
        <Analytics />
      </body>
    </html>
  );
}
