<template>
  <v-dialog
    v-model="dialog"
    activator="parent"
    max-width="500"
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
            {{ $t('accounts.USERNAME') }}
          </div>
          <v-text-field
            v-model="username"
            density="compact"
            prepend-inner-icon="mdi-email-outline"
            :rules="[rules.required, rules.emailRules]"
          ></v-text-field>
        </div>

        <div
          class="mb-1"
        >
          <div class="text-body-2 font-weight-medium">
            {{ $t('accounts.PASSWORD') }}
          </div>
          <v-text-field
            v-model="password"
            density="compact"
            :type="showPassword ? 'text' : 'password'"
            prepend-inner-icon="mdi-lock-outline"
            :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required]"
            @click:append-inner="showPassword = !showPassword"
            autocomplete
          ></v-text-field>
        </div>
      </v-form>

      <v-row
        class="text-subtitle-2 text-right"
      >
        <v-col>
          <v-checkbox
            v-model="remember"
            density="compact"
            color="secondary"
          >
          <template v-slot:label>
            <span
              class="ml-1 text-subtitle-2"
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
            class="text-decoration-none"
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
          class="text-decoration-none"
          @click="dialog=false"
        >
          {{ $t('action.SIGNUP') }}
        </router-link>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import useRules from '@/composables/rules'

export default {
  setup() {
    const { rules } = useRules()
    return { rules }
  },
  data() {
    return {
      dialog: false,
      validation: false,
      username: null,
      password: null,
      showPassword: false,
      remember: false,
    }
  },
  beforeUpdate() {
    this.username = null
    this.password = null
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
        vm.$toast.success(
          vm.$t('message.HELLO_USER', { call_name: user.call_name })
        )
      })
      .catch(function (error) {
        vm.$toast.error(vm.$error(error, 'ACCOUNTS_LOGIN'))
      })
    },
  }
}
</script>

<style scoped>
  a {
    color: #EB6669 !important;
  }
  a:hover {
    color: #F9CECE !important;
  }
</style>
