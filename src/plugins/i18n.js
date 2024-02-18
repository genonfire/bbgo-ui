import { createI18n } from 'vue-i18n'

import en from '/locales/en.json'
import ko from '/locales/ko.json'

export default createI18n(
  {
    locale: import.meta.env.VITE_API_LOCALE,
    fallbackLocale: 'en',
    messages: {
      'en': en,
      'ko': ko,
    }
  }
)
