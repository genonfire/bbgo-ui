import { defineStore } from 'pinia'

const Const = {
  LANGUAGES: [
    {
      text: 'Korean',
      value: 'ko'
    },
    {
      text: 'English',
      value: 'en'
    },
  ],
  DEFAULT_LANGUAGE: 'ko',
}

function localStore (key, value, save=true) {
  if (!save)
    return

  localStorage.setItem(key, value)
}

export const useAppStore = defineStore('app', {
  state: () => ({
    key: null,
    user: null,
    login_device: null,
    locale: import.meta.env.VITE_API_LOCALE,
    theme: import.meta.env.VITE_THEME_DEFAULT,
  }),
  getters: {
    isLoggedIn: (state) => state.key,
  },
  actions: {
    setLocale (value, save=true) {
      this.locale = value
      localStore('locale', value, save)
    },
    setTheme (value, save=true) {
      this.theme = value
      localStore('theme', value, save)
    },
    login (key) {
      this.key = key
    },
    const (key) {
      return Const[key]
    }
  }
})
