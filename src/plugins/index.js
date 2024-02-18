/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from './vuetify'
import router from '../router'
import pinia from '../store'
import i18n from './i18n'

import VueGtag from "vue-gtag"

export function registerPlugins (app) {
  app
    .use(vuetify)
    .use(router)
    .use(pinia)
    .use(i18n)

  if (import.meta.env.VITE_GTAG_ID) {
    app.use(VueGtag, {
        appName: import.meta.env.VITE_APP_NAME,
        pageTrackerScreenviewEnabled: true,
        config: {
          id: import.meta.env.VITE_GTAG_ID
        },
      }, router)
  }
}
