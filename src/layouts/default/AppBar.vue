<template>
  <v-app-bar>
    <template v-slot:prepend>
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
        <img
          src="/logo.png"
          class="appbar-logo"
          @click="$router.push({ name: 'home' })"
        >
    </template>

    <v-responsive
      class="mx-3 appbar-search"
    >
      <v-text-field
        ref="search"
        v-model="search"
        variant="outlined"
        density="compact"
        clearable
        hide-details
        prepend-inner-icon="mdi-magnify"
        :placeholder="$t('common.SEARCH')"
        @keydown.esc="onEsc"
        @keydown.enter="onEnter"
        accesskey="/"
      >
      </v-text-field>
    </v-responsive>

   <template v-slot:append>
    <div
      v-if="user"
    >
      <v-btn
        id="bell"
        :icon="bell? 'mdi-bell-badge-outline': 'mdi-bell-outline'"
        class="mr-2"
        :color="bell? 'secondary': ''"
      >
      </v-btn>

      <v-btn
        id="avatar"
        icon
      >
        <v-avatar
          :image="user.photo"
          size=42
          v-if="user.photo"
        ></v-avatar>
        <v-avatar
          icon="mdi-account-outline"
          color="tertiary"
          size=42
          v-else
        ></v-avatar>
      </v-btn>
      <AvatarMenu />

    </div>
    <v-btn
      variant="flat"
      color="secondary"
      width="80"
      v-if="!user"
    >
      {{ $t('action.LOGIN') }}
      <LoginDialog />
    </v-btn>
   </template>
  </v-app-bar>

  <v-navigation-drawer
    v-model="drawer"
  >
    <Menu />
  </v-navigation-drawer>
</template>

<script>
import LoginDialog from '@/components/LoginDialog'
import Menu from '@/components/Menu'
import AvatarMenu from '@/components/AvatarMenu'

export default {
  components: {
    LoginDialog,
    Menu,
    AvatarMenu,
  },
  data() {
    return {
      drawer: false,
      search: null,
      bell: false,
    }
  },
  computed : {
    user() {
      return this.$store.getUser
    },
  },
  methods: {
    onEsc() {
      this.$refs.search.blur()
    },
    onEnter() {
      this.searchAnything(this.search)
    },
    searchAnything(search) {
      this.onEsc()

      if (this.$route.name.includes('blogs')) {
        this.$router.push({
          name: 'blogs',
          query: {
            q: this.search
          }
        })
      }
      else if (this.$route.name.includes('thread')) {
        this.$router.push({
          name: 'thread',
          params: {
            forum: this.$route.params.forum
          },
          query: {
            q: this.search
          }
        })
      }
    },
  }
}
</script>

<style>
  img.appbar-logo {
    height: 42px;
    margin-left: 8px;
    cursor: pointer;
  }

  .appbar-search {
    max-width: 800px;
  }
</style>
