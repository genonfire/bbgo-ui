<template>
  <v-dialog
    v-model="dialog"
    activator="parent"
    width="500"
  >
    <v-card
      class="pa-6"
    >
      <v-card-title
        class="mb-4 text-h5 font-weight-bold text-center"
      >
        {{ $t('action.LOGIN') }}
      </v-card-title>

      <v-form
        v-model="validation"
      >
        <div
          class="mb-1"
        >
          <div class="text-body-2 font-weight-medium">
            {{ $t('common.USER_EMAIL') }}
          </div>
          <v-text-field
            v-model="username"
            density="compact"
            prepend-inner-icon="mdi-email-outline"
            :placeholder="$t('hint.ENTER_YOUR_EMAIL')"
            :rules="[rules.required, rules.emailRules]"
          ></v-text-field>
        </div>

        <div
          class="mb-1"
        >
          <div class="text-body-2 font-weight-medium">
            {{ $t('common.USER_PASSWORD') }}
          </div>
          <v-text-field
            v-model="password"
            density="compact"
            :type="showPassword ? 'text' : 'password'"
            prepend-inner-icon="mdi-lock-outline"
            :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :placeholder="$t('hint.ENTER_YOUR_PASSWORD')"
            :rules="[rules.required]"
            @click:append-inner="showPassword = !showPassword"
            autocomplete
          ></v-text-field>
        </div>
      </v-form>

      <v-row
        class="text-subtitle-2 text-right"
      >
        <v-col
          class="py-0"
        >
          <v-checkbox
            v-model="remember"
            density="compact"
            color="secondary"
          >
          <template v-slot:label>
            <span
              class="text-subtitle-2"
            >
              {{ $t('hint.REMEMBER_ME') }}
            </span>
          </template>
          </v-checkbox>
        </v-col>
        <v-col
          class="pt-2"
        >
          <router-link
            :to="{ name: 'accounts.password.find' }"
            @click="dialog=false"
          >
            {{ $t('hint.FORGOT_PASSWORD') }}
          </router-link>
        </v-col>
      </v-row>

      <v-card-actions
        class="pa-0"
      >
        <v-btn
          color="secondary"
          block
          :disabled="!validation"
          @click="login"
        >
          {{ $t('action.LOGIN') }}
        </v-btn>
      </v-card-actions>

      <div
        class="mt-1 text-subtitle-2 text-center"
      >
        {{ $t('hint.NO_ACCOUNT') }}
        <router-link
          :to="{ name: 'accounts.signup' }"
          @click="dialog=false"
        >
          {{ $t('action.SIGNUP') }}
        </router-link>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      validation: false,
      username: null,
      password: null,
      showPassword: false,
      remember: false,
      rules: {
        required: v => !!v || this.$t('error.REQUIRED_FIELD'),
        emailRules: v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || this.$t('error.INVALID_EMAIL'),
      },
    }
  },
  beforeUpdate() {
    this.username = '1@a.com'
    this.password = 'd'
  },
  methods: {
    login() {
      const vm = this

      this.$axios({
        method: this.$api('ACCOUNTS_LOGIN').method,
        url: this.$api('ACCOUNTS_LOGIN').url,
        data: {
          username: this.username,
          password: this.password,
        },
      })
      .then(function (response) {
        const key = response.data['data']['key']
        const user = response.data['data']['user']

        vm.$store.setToken(key, vm.remember)
        vm.$store.setUser(user, vm.remember)
        vm.$axios.defaults.headers.common['Authorization'] = 'Token ' + key
        vm.dialog = false
      })
      .catch(function (error) {
        if (error.response && error.response.data['error']) {
          vm.$toast.error(error.response.data['error']['message'])
        }
      })
    },
  }
}
</script>

<style scoped>
  a {
    color: #EB6669;
    text-decoration: none;
  }
  a:hover {
    color: #F9CECE;
  }
</style>
