<template>
  <v-menu activator="#avatar">
    <v-list
      density="compact"
      nav
    >
      <v-list-item
        v-for="(item, i) in menu"
        :key="i"
        :value="item"
        @click="$router.push(item.to)"
        class="px-4 py-0 my-0"
      >
        <v-list-item-title v-text="item.text"></v-list-item-title>
      </v-list-item>

      <v-list-item
        @click="logout"
        class="px-4 py-0 my-0"
        style="color: #EB6669;"
      >
        <v-list-item-title>
          <v-icon class="mr-1">mdi-logout</v-icon>
          {{ $t('action.LOGOUT') }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  computed: {
    menu () {
      return [
        {
          text: this.$t('menu.SETTINGS'),
          to: { name: 'Home' },
        },
        {
          text: this.$t('menu.PROFILE'),
          to: { name: 'Home' },
        },
        {
          text: this.$t('menu.CHANGE_PASSWORD'),
          to: { name: 'Home' },
        },
      ]
    }
  },
  methods: {
    logout () {
      const vm = this

      this.$axios({
        method: this.$api('ACCOUNTS_LOGOUT').method,
        url: this.$api('ACCOUNTS_LOGOUT').url,
      })
      .then(function (response) {
        vm.$toast.info(vm.$t('hint.LOGOUT_COMPLETED'))
        vm.$store.logout()
        vm.$axios.defaults.headers.common['Authorization'] = ''
      })
      .catch(function (error) {
        if (error.response && error.response.data['error']) {
          vm.$toast.error(error.response.data['error']['message'])
        }
      })
    }
  }
}
</script>
