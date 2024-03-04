<template>
  <v-list
  >
    <v-list-item
      v-for="(item, i) in menu"
      :key="i"
      :value="item"
      @click="$router.push(item.to)"
    >
      <template v-slot:prepend>
        <v-icon
          :icon="item.icon"
          v-if="item.icon"
        ></v-icon>
      </template>
      <v-list-item-title v-text="item.text"></v-list-item-title>
    </v-list-item>

    <v-divider></v-divider>

    <v-list-subheader>{{ $t('common.LANGUAGE') }}</v-list-subheader>
    <v-list-item
      v-for="(item, i) in $store.const('LANGUAGES')"
      :key="i"
      :value="item"
      :active="languageSelected(item.value)"
      @click="changeLocale(item.value)"
    >
      <v-list-item-title v-text="item.text"></v-list-item-title>
    </v-list-item>

    <v-list-subheader>{{ $t('common.THEME') }}</v-list-subheader>
    <div
      class="mx-4"
    >
      <span>
        <v-btn
          icon="mdi-weather-sunny"
          variant="flat"
          @click="setTheme('light')"
        >
        </v-btn>
      </span>
      <span>
        <v-btn
          icon="mdi-weather-night"
          variant="flat"
          @click="setTheme('dark')"
        >
        </v-btn>
      </span>
    </div>

    <v-list-item-subtitle
      class="mt-4 mx-6 text-caption footer"
    >
      &copy; {{ new Date().getFullYear() }} {{ appName }}
      <a href="https://github.com/genonfire/bbgo-core" target="_blank">
        Made by bbgo
      </a>
    </v-list-item-subtitle>
  </v-list>
</template>

<script>
import { useTheme } from 'vuetify'

export default {
  setup() {
    const theme = useTheme()
    return { theme }
  },
  data() {
    return {
      appName: import.meta.env.VITE_APP_NAME,
    }
  },
  computed: {
    menu() {
      let items = [
        {
          text: this.$t('menu.HOME'),
          icon: 'mdi-home-outline',
          to: { name: 'home' }
        }
      ]
      return items
    },
  },
  methods: {
    languageSelected(value) {
      return this.$i18n.locale == value
    },
    changeLocale(locale) {
      if (this.$i18n.locale != locale) {
        const api = import.meta.env.VITE_API_PREFIX
        let prefix = import.meta.env.VITE_API_URL

        if (this.$store.const('DEFAULT_LANGUAGE') != locale) {
          prefix += locale + '/'
        }
        this.$axios.defaults.baseURL = (prefix + api)

        this.$i18n.locale = locale
        this.$store.setLocale(locale)
      }
    },
    setTheme(theme) {
      this.theme.global.name.value = theme
      this.$store.setTheme(theme)
    },
  }
}
</script>

<style scoped>
  .footer a {
    color: #9095A0;
    text-decoration: none;
  }
  .footer a:hover {
    color: #F9CECE;
  }
</style>
