import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    isAuthenticated: false,
    key: null,
  }),
  getters: {
    isLoggedIn: (state) => state.isAuthenticated,
  },
  actions: {
    login (key) {
      this.key = key
      this.isAuthenticated = true
    }
  }
})
