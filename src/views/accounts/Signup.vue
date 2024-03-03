<template>
  <div
    v-if="!$store.getUser"
  >
    <v-card
      class="mx-auto mt-3 pa-6 pt-2"
      width="500"
    >
      <v-card-title
        class="mb-4 text-h5 font-weight-bold text-center"
      >
        {{ $t('action.SIGNUP') }}
      </v-card-title>

      <v-form
        v-model="validation"
      >
        <v-row
        >
          <v-col
            class="mb-0 pb-0"
          >
            <div class="text-body-2 font-weight-medium">
              {{ $t('common.USER_FIRSTNAME' )}}
            </div>
            <v-text-field
              v-model="firstname"
              density="compact"
              :rules="[rules.required]"
            ></v-text-field>
          </v-col>
          <v-col
            class="mb-0 pb-0"
          >
            <div class="text-body-2 font-weight-medium">
              {{ $t('common.USER_LASTNAME' )}}
            </div>
            <v-text-field
              v-model="lastname"
              density="compact"
              :rules="[rules.required]"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            class="mb-0 pb-0"
          >
            <div class="text-body-2 font-weight-medium">
              {{ $t('common.USER_USERNAME') }}
            </div>
            <v-text-field
              v-model="username"
              density="compact"
              :placeholder="$t('hint.ENTER_YOUR_EMAIL')"
              :rules="[rules.required, rules.emailRules]"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            class="mb-0 pb-0"
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
          </v-col>
        </v-row>
        <v-row>
          <v-col
            class="mb-0 pb-0"
          >
            <div class="text-body-2 font-weight-medium">
              {{ $t('common.USER_PASSWORD_CONFIRM') }}
            </div>
            <v-text-field
              v-model="passwordConfirm"
              density="compact"
              :type="showPassword ? 'text' : 'password'"
              prepend-inner-icon="mdi-lock-outline"
              :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :placeholder="$t('hint.ENTER_YOUR_PASSWORD')"
              :rules="[rules.required, rules.samePassword]"
              @click:append-inner="showPassword = !showPassword"
              autocomplete
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            class="mb-0 pb-0"
          >
            <div class="text-body-2 font-weight-medium">
              <v-checkbox
                v-model="consent"
                density="compact"
                hide-details
                color="secondary"
                :rules="[rules.required]"
              >
                <template
                  v-slot:label
                >
                  <span
                    class="ml-1 text-subtitle-2"
                  >
                    <i18n-t keypath="hint.SIGNUP_CONSENT" scope="global">
                      <template v-slot:terms>
                        <a href="#">
                          {{ $t('action.TERMS') }}
                        </a>
                      </template>
                      <template v-slot:privacy>
                        <a href="#">
                          {{ $t('action.PRIVACY') }}
                        </a>
                      </template>
                    </i18n-t>
                  </span>
                </template>
              </v-checkbox>
            </div>
          </v-col>
        </v-row>
        <v-card-actions
          class="mt-5 pa-0"
        >
          <v-btn
            color="secondary"
            block
            :disabled="!validation"
            @click="signup"
          >
            {{ $t('action.SIGNUP') }}
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import { useError } from '@/composables/error'

export default {
  data() {
    return {
      validation: false,
      firstname: null,
      lastname: null,
      username: null,
      password: null,
      passwordConfirm: null,
      showPassword: false,
      consent: false,
      rules: {
        required: v => !!v || this.$t('error.REQUIRED_FIELD'),
        emailRules: v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || this.$t('error.INVALID_EMAIL'),
        samePassword: v => v == this.password || this.$t('error.PASSWORD_NOT_MATCH'),
      },
    }
  },
  methods: {
    signup() {
      const vm = this

      this.$axios({
        method: this.$api('ACCOUNTS_SIGNUP').method,
        url: this.$api('ACCOUNTS_SIGNUP').url,
        data: {
          username: this.username,
          password: this.password,
          first_name: this.firstname,
          last_name: this.lastname,
        },
      })
      .then(function (response) {
        vm.$router.push({ name: 'home' })
        vm.$toast.success(vm.$t('message.SIGNUP_COMPLETE'))
      })
      .catch(function (error) {
        vm.$toast.error(useError(error, 'ACCOUNTS_SIGNUP'))
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
