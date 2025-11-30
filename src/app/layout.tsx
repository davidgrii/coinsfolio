import React from 'react';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { cn } from '@/components/ui/utils';
import QueryProvider from '@/app/_providers/query-provider';
import { Analytics } from '@vercel/analytics/next';
import '@telegram-apps/telegram-ui/dist/styles.css';
import { TelegramProvider } from '@/app/_providers/telegram-provider';

const inter = Inter({
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
});

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
        className={cn(`bg-base-background overflow-hidden ${inter.className}`)}
      >
        <QueryProvider>
          <TelegramProvider>
            {children}
          </TelegramProvider>
        </QueryProvider>
        <Analytics />
      </body>
    </html>
  );
}
