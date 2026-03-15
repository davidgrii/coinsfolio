# coinfolio

A Telegram Mini App for crypto portfolio tracking with real-time market data, multi-portfolio management, and smart price alerts. Built with native Telegram UI and deployed on Railway.

**[@coinsfolio_bot](https://t.me/coinsfolio_bot)** — open in Telegram to try the app.

## Overview

Coinfolio lets users track their crypto holdings directly inside Telegram. The app pulls live market data, calculates profit/loss per coin, and sends Telegram notifications when user-defined price conditions are met.

**Key features:**
- Live market data — price, 24h change, market cap, volume, ATH, exchange breakdown
- Market filters — Favorites, Trending, Pump, Dump
- Multi-portfolio support — up to 3 separate portfolios per user
- Portfolio tracking — balance, invested amount, P&L in $ and % per coin
- CRUD for holdings — add, edit, delete coins with purchase price and amount
- Smart Alerts — Price Alerts and Percentage Alerts with Telegram push notifications
- Coin detail page — full market data + exchange volume breakdown
- Multilingual — i18n support via i18next
- Native Telegram UI — built with @telegram-apps/telegram-ui

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| UI | Tailwind CSS v4, Radix UI, Telegram UI |
| State | Zustand |
| Data fetching | React Query (TanStack) |
| Animations | Framer Motion |
| i18n | i18next + react-i18next |
| Charts | Recharts |
| Linter | Biome |
| Deploy | Vercel (frontend) + Railway (backend + cron) |

## Architecture

```
Telegram Mini App (Next.js)
        │
        ▼
React Query — data fetching + caching
        │
        ├── Market API (prices, trending, coin detail)
        └── Portfolio API (user holdings, alerts)
                │
                ▼
        Backend (Node.js, Railway)
                │
                ├── Cron job (every 3 min) — fetch prices, check alerts
                └── PostgreSQL — users, portfolios, coins, alerts
                        │
                        ▼
                Telegram Bot API — push notifications on alert trigger
```

## Smart Alerts

| Alert type | Description |
|---|---|
| Price Alert | Notify when coin reaches a target price |
| Percentage Alert | Notify on % change from current price |
| Volatility Alert | *(coming soon)* |
| Active Alerts | View and manage all active alerts |

## Project Structure

```
src/
├── app/                        # Next.js App Router pages
├── components/                 # UI components
│   ├── dashboard/              # Dashboard layout
│   ├── favorites/              # Favorites list
│   ├── market/                 # Market list, filters, coin cards
│   ├── portfolio/              # Portfolio tabs, coin rows, P&L
│   ├── settings/               # Settings, alerts UI
│   ├── ui/                     # Shared primitives (Radix-based)
│
├── hooks/                      # Custom React hooks
├── lib/                        # API clients, utils
├── store/                      # Zustand stores
├── widgets/                    # Composite UI blocks
├── constants.ts
├── i18n.ts
└── middleware.ts
public/
└── locales/                    # i18n translation files
```

## Environment Variables

```env
NEXT_PUBLIC_PROD_BACKEND_URL=
NEXT_PUBLIC_LOCAL_URL=

NEXT_PUBLIC_LOCAL_BACKEND_URL=
NEXT_PUBLIC_PROD_URL=
```

## Getting Started

```bash
npm install
cp .env.example .env
# fill in your values
npm run dev
```

Open in Telegram via your bot's Mini App link, or use the Telegram web client.

## Live Demo

**[@coinsfolio_bot](https://t.me/coinsfolio_bot)** — open in Telegram to try the app.

## Notes

Personal project built from scratch — architecture, UI, and backend by me. Inspired by an earlier version (Coins App) but fully rewritten with a new stack, native Telegram UI, and smart alert system.