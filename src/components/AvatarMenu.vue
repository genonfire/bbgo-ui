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
import { useError } from '@/composables/error'

export default {
  computed: {
    menu() {
      return [
        {
          text: this.$t('menu.PROFILE'),
          to: { name: 'accounts.profile' },
        },
        {
          text: this.$t('menu.SETTINGS'),
          to: { name: 'accounts.settings' },
        },
        {
          text: this.$t('menu.CHANGE_PASSWORD'),
          to: { name: 'accounts.password.change' },
        },
      ]
    }
  },
  methods: {
    logout() {
      const vm = this

      this.$axios({
        method: this.$api('ACCOUNTS_LOGOUT').method,
        url: this.$api('ACCOUNTS_LOGOUT').url,
      })
      .then(function (response) {
        vm.$axios.defaults.headers.common['Authorization'] = ''
        vm.$store.logout()

        vm.$router.push({ name: 'home' })
        vm.$toast.info(vm.$t('message.LOGOUT_COMPLETE'))
      })
      .catch(function (error) {
        vm.$toast.error(useError(error, 'ACCOUNTS_LOGOUT'))
      })
    }
  }
}
</script>
