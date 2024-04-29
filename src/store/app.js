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

function localStore(key, value, save) {
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
    blogOption: null,
  }),
  getters: {
    isLoggedIn: (state) => state.token,
    isApproved: (state) => state.token && state.user && state.user.is_approved,
    isStaff: (state) => state.token && state.user && state.user.is_staff,
    getUser: (state) => state.user,
    getLocale: (state) => state.locale,
    isDarkMode: (state) => state.theme == 'dark',
    getBlogOption: (state) => state.blogOption,
  },
  actions: {
    setLocale(value, save=true) {
      this.locale = value
      localStore('locale', value, save)
    },
    setTheme(value, save=true) {
      this.theme = value
      localStore('theme', value, save)
    },
    setToken(value, save=true) {
      this.token = value
      localStore('token', value, save)
    },
    setUser(value, save=true) {
      this.user = value
      localStore('user', value, save)
    },
    setBlogOption(value) {
      this.blogOption = value
    },
    logout() {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      this.token = null
      this.user = null
    },
    const(key) {
      return Const[key]
    }
  }
})
