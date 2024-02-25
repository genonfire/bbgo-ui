/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'
import { useAppStore } from '@/store/app'
import APIs from '@/plugins/apiurls'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'
import { toast } from 'vue-sonner'
import axios from 'axios'

const app = createApp(App)

registerPlugins(app)

app.config.globalProperties.$axios = axios
app.config.globalProperties.$toast = toast
app.config.globalProperties.$store = useAppStore()
app.config.globalProperties.$api = (key) => APIs[key]

app.mount('#app')
