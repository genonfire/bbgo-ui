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
  DEFAULT_LANGUAGE: import.meta.env.VITE_API_LOCALE,
  THEMES: ['light', 'dark'],
}

function localStore (key, value, save=true) {
  if (!save)
    return

  localStorage.setItem(key, value)
}

export const useAppStore = defineStore('app', {
  state: () => ({
    token: null,
    user: null,
    locale: null,
    theme: null,
  }),
  getters: {
    isLoggedIn: (state) => state.token,
    getUser: (state) => state.user,
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
    setToken (value, save=true) {
      this.token = value
      localStore('token', value, save)
    },
    setUser (value, save=true) {
      this.user = value
      localStore('user', value, save)
    },
    logout () {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      this.token = null
      this.user = null
    },
    const (key) {
      return Const[key]
    }
  }
})
