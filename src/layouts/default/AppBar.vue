<template>
  <v-app-bar>
    <template v-slot:prepend>
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
        <img
          src="/logo.png"
          class="appbar-logo"
          @click="$router.push({ name: 'Home' })"
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
    <v-btn
      variant="flat"
      color="secondary"
      width="80"
    >
      {{ $t('action.LOGIN') }}
      <Login />
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
import Login from '@/components/Login'
import Menu from '@/components/Menu'

export default {
  components: {
    Login,
    Menu
  },
  data () {
    return {
      drawer: false,
      search: null,
    }
  },
  methods: {
    onEsc () {
      this.$refs.search.blur()
    },
    onEnter () {
      this.searchAnything(this.search)
    },
    searchAnything (search) {
      this.onEsc()
    },
  },
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
