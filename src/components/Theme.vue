<template>
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
</template>

<script setup>
import { useTheme } from 'vuetify'
import { useAppStore } from '@/store/app'

const theme = useTheme()

function setTheme (newTheme) {
  theme.global.name.value = newTheme

  const store = useAppStore()
  store.setTheme(newTheme)
}
</script>
