import 'i18next'

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNamespace: 'translation';
    resources: {
      translation: {
        market: string
        favorites: string
        portfolio: string
        friends: string
        search: string
        table_header: {
          rank: string
          coin: string
          price: string
          change: string
        }
        balance_table_header: {
          coin: string
          price: string
          value: string
        }
        dashboard: {
          market_cap: string
          n_a: string
          trending: string
          dominance: string
        }
        dashboard_balance: {
          my_balance: string
          invested: string
          '24h': string
          over_time: string
        }
        dashboard_friends: {
          coin: string
        }
        empty_favorites: {
          no_coins: string
          add_first_tap: string
          add_first: string
        }
        empty_profile: {
          no_invited: string
          start_inviting: string
          share: string
        }
        my_portfolio_page: {
          edit: string
          delete: string
          purchase: string
          invested: string
          over_entry: string
          are_agree: string
          agree_btn: string
          disagree: string
        }
        add_crypto: {
          add_coin: string
          add_coin_desc: string
          choose: string
          quantity: string
          purchase: string
          note: string
          btn: string
        }
        edit_crypto: {
          edit_coin: string
          quantity: string
          btn: string
        }
        crypto_details_popup: {
          coins_data: string
          coin_data_table: {
            market_cap: string
            fdv: string
            volume_24h: string
            circulation_supply: string
            total_supply: string
            ath: string
          }
          markets: string
          exchange: string
          volume_24h: string
          coingeko_info: {
            title: string
            agree: string
            disagree: string
          }
        }
        input_search: {
          search: string
          cancel: string
        }
        titles: {
          Beginner: string
          Explorer: string
          Expert: string
          Knight: string
          Leader: string
          Hero: string
          Master: string
          Legend: string
          Titan: string
          King: string
          Emperor: string
          Lord: string
          Immortal: string
        }
        CATEGORIES_NAV_ITEMS: {
          market: string
          favorites: string
          pump: string
          dump: string
          trending: string
        }
      }
    }
  }
}
