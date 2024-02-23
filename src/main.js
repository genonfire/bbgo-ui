/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'
import { useAppStore } from '@/store/app'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'
import axios from 'axios'

const app = createApp(App)

registerPlugins(app)

app.config.globalProperties.$axios = axios
app.config.globalProperties.$store = useAppStore()

app.mount('#app')
