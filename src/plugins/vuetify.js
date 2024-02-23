/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
// import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          secondary: '#EB6769FF',
          tertiary: "#403235",
        },
      },
      dark: {
        colors: {
          secondary: '#EB6769FF',
          tertiary: "#403235",
        },
      },
    },
    defaultTheme: import.meta.env.VITE_THEME_DEFAULT
  },
})
