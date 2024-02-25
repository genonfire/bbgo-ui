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
          secondary: '#EB6669',
          tertiary: "#F9CECE",
          quaternary: "#403235",
        },
      },
      dark: {
        colors: {
          secondary: '#EB6669',
          tertiary: "#F9CECE",
          quaternary: "#403235",
        },
      },
    },
    defaultTheme: 'light'
  },
  defaults: {
    VCardActions: {
      VBtn: {
        variant: 'flat',
      }
    }
  },
})
