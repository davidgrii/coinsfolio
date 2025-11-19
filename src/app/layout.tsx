import React from 'react'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { cn } from '@/components/ui/utils'
import QueryProvider from '@/app/_providers/query-provider'
import { Analytics } from '@vercel/analytics/next'

const inter = Inter({
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'Coins Folio',
  description: 'Developed by | david_gri'
}

export default function RootLayout(
  {
    children
  }: Readonly<{
    children: React.ReactNode
  }>) {

  return (
    <html lang="en">
    <head>
      <script src="https://telegram.org/js/telegram-web-app.js" defer></script>
    </head>

    <body className={cn(`bg-background ${inter.className}`)}>
    {/*<React.StrictMode>*/}
      <QueryProvider>
        {children}
      </QueryProvider>
    <Analytics />
    {/*</React.StrictMode>*/}
    </body>
    </html>
  )
}