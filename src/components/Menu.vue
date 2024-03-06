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

    <v-list-item-subtitle
      class="mt-4 mx-6 text-caption footer"
    >
      &copy; {{ new Date().getFullYear() }} {{ $t('info.SITENAME') }}
      <a href="https://github.com/genonfire/bbgo-core" target="_blank">
        Made by bbgo
      </a>
    </v-list-item-subtitle>
  </v-list>
</template>

<script>
export default {
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
