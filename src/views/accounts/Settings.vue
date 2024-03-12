<template>
  <v-card
    fluid
    class="mx-auto mt-3 pa-6 pt-2"
    max-width="500"
  >
    <v-card-title
      class="mb-4 text-h5 font-weight-bold text-center"
    >
      {{ $t('menu.SETTINGS') }}
    </v-card-title>

    <v-row>
      <v-switch
        v-model="dark"
        color="secondary"
      >
        <template v-slot:prepend>
          <v-icon
            icon="mdi-weather-night"
            class="ml-6 mr-3"
          ></v-icon>
          <span
            class="mr-8"
          >
            {{ $t('common.THEME_DARK') }}
          </span>
        </template>
      </v-switch>
    </v-row>
    <v-row
      class="mt-0 px-4"
    >
      <v-select
        v-model="locale"
        :label="$t('common.LANGUAGE')"
        :item-props="localeProps"
        :items="$store.const('LANGUAGES')"
      ></v-select>
    </v-row>

    <v-card-actions
      class="mt-5 pa-0"
    >
      <v-btn
        color="secondary"
        block
        @click="save"
      >
        {{ $t('action.SAVE') }}
      </v-btn>
    </v-card-actions>

    <v-row
      class="mt-6"
    >
      <v-spacer></v-spacer>
      <v-btn
        variant="text"
        color="pale"
        size="small"
        :to="{ name: 'accounts.delete' }"
      >
        {{ $t('menu.DELETE_ACCOUNT') }}
      </v-btn>
    </v-row>
  </v-card>
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
      dark: this.$store.isDarkMode,
      locale: this.$store.getLocale,
    }
  },
  methods: {
    localeProps(item) {
      return {
        title: item.text,
        value: item.value,
      }
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
    save() {
      const theme = (this.dark) ? 'dark': 'light'
      this.setTheme(theme)
      this.changeLocale(this.locale)
    }
  }
}
</script>
