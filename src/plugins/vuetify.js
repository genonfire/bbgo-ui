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
          base: "#F9CECE",
          pale: "#9095A0",
          ashen: "#ECEFF1",
          serene: '#66BB6A',
          info: '#379AE6',
          neutral: '#F3F4F6',
        },
      },
      dark: {
        colors: {
          secondary: '#EB6669',
          base: "#F9CECE",
          pale: "#9095A0",
          ashen: "#ECEFF1",
          serene: '#66BB6A',
          info: '#379AE6',
          neutral: '#F3F4F6',
        },
      },
    },
    defaultTheme: 'light'
  },
  defaults: {
    VCol: {
      class: 'py-0'
    },
    VCardActions: {
      VBtn: {
        variant: 'flat',
      },
    },
    VTooltip: {
      location: 'top',
    },
  },
})
