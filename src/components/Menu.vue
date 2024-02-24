<template>
  <v-list
  >
    <v-list-item
      v-for="(item, i) in menu"
      :key="i"
      :value="item"
      :to="item.to"
    >
      <template v-slot:prepend>
        <v-icon :icon="item.icon"></v-icon>
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
    <Theme />

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
import Theme from '@/components/Theme'

export default {
  components: {
    Theme
  },
  data () {
    return {
      appName: import.meta.env.VITE_APP_NAME,
    }
  },
  computed: {
    menu () {
      let items = [
        {
          text: this.$t('menu.HOME'),
          icon: 'mdi-home-outline',
          to: { name: 'Home' }
        }
      ]
      return items
    },
  },
  methods: {
    languageSelected (value) {
      return this.$i18n.locale == value
    },
    changeLocale (locale) {
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
  }
}
</script>

<style scoped>
  .footer a {
    color: #333;
  }
  .footer a:hover {
    color: #000;
  }
</style>
