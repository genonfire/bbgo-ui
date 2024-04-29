<template>
  <v-list>
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
      <v-list-item-title v-text="item.text" ></v-list-item-title>
    </v-list-item>
    <v-divider class="my-1"></v-divider>
  </v-list>

  <v-list
    class="pt-0"
    v-if="$store.isStaff"
  >
    <v-list-item-title
      class="ml-3 font-weight-bold"
    >
      {{ $t('common.ADMIN') }}
    </v-list-item-title>
    <v-list-item
      v-for="(item, i) in staffMenu"
      :key="i"
      :value="item"
      @click="openMenu(item)"
    >
      <template v-slot:prepend>
        <v-icon
          :icon="item.icon"
          v-if="item.icon"
        ></v-icon>
      </template>
      <v-list-item-title v-text="item.text"></v-list-item-title>
    </v-list-item>
    <v-divider class="my-1"></v-divider>
  </v-list>

  <div
    class="mt-2 mx-6 text-caption footer"
  >
    &copy; {{ new Date().getFullYear() }} {{ $t('info.SITENAME') }}
    <a href="https://github.com/genonfire/bbgo-core" target="_blank">
      Made by bbgo
    </a>
  </div>
</template>

<script>
export default {
  computed: {
    menu() {
      const items = [
        {
          text: this.$t('menu.BLOG'),
          icon: 'mdi-post-outline',
          to: { name: 'blogs' }
        },
      ]
      return items
    },
    staffMenu() {
      let items = [
        {
          text: this.$t('menu.MANAGE_USERS'),
          icon: 'mdi-account-outline',
          to: { name: 'admin.users' }
        },
        {
          text: this.$t('menu.MANAGE_BLOGS'),
          icon: 'mdi-post-outline',
          to: { name: 'admin.blogs' }
        },
        {
          text: this.$t('menu.MANAGE_FORUMS'),
          icon: 'mdi-forum-outline',
          to: { name: 'admin.forums' }
        },
        {
          text: this.$t('menu.MANAGE_THREADS'),
          icon: 'mdi-message-reply-outline',
          to: { name: 'admin.threads' }
        },
        {
          text: this.$t('menu.SITE_ADMIN'),
          icon: 'mdi-view-grid',
          url: import.meta.env.VITE_API_URL + 'admin/'
        },
      ]
      return items
    }
  },
  methods: {
    openMenu(item) {
      const url = item['url']

      if (url) {
        window.open(url, '_blank')
      }
      else {
        this.$router.push(item['to'])
      }
    },
  }
}
</script>

<style scoped>
  .v-list-item {
    margin-left: 2px;
  }
  .v-list-item-title {
    font-size: 0.875rem !important;
  }
  .footer a {
    color: #9095A0;
    text-decoration: none;
  }
  .footer a:hover {
    color: #F9CECE;
  }
</style>
