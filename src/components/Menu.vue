<template>
  <v-list>
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
      class="mt-4 mx-8 text-caption"
    >
      &copy; {{ new Date().getFullYear() }} {{ appName }}
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
  methods: {
    languageSelected: function (value) {
      return this.$i18n.locale == value
    },
    changeLocale: function (locale) {
      if (this.$i18n.locale != locale) {
        this.$i18n.locale = locale
        this.$store.setLocale(locale)
      }
    },
  }
}
</script>
