<template>
  <v-card
    class="mx-auto mt-3 pa-6 pt-2"
    width="500"
  >
    <v-card-title
      class="mb-4 text-h5 font-weight-bold text-center"
    >
      {{ $t('menu.RESET_PASSWORD') }}
    </v-card-title>

    <div
      v-if="done"
    >
      <v-sheet
      >
        {{ $t('hint.PASSWORD_RESET_COMPLETE') }}
      </v-sheet>
    </div>

    <div
      v-else
    >
      <v-sheet
        class="mx-2 mb-5"
      >
        {{ $t('hint.PASSWORD_RESET_DESCRIPTION') }}
      </v-sheet>

      <v-form
        v-model="validation"
      >
        <v-row>
          <v-col
            class="mb-0 pb-0"
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
          </v-col>
        </v-row>
        <v-row>
          <v-col
            class="mb-0 pb-0"
          >
            <div class="text-body-2 font-weight-medium">
              {{ $t('accounts.PASSWORD_CONFIRM') }}
            </div>
            <v-text-field
              v-model="passwordConfirm"
              density="compact"
              :type="showPassword ? 'text' : 'password'"
              prepend-inner-icon="mdi-lock-outline"
              :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.samePassword]"
              @click:append-inner="showPassword = !showPassword"
              autocomplete
            ></v-text-field>
          </v-col>
        </v-row>
      </v-form>

      <v-card-actions
        class="mt-5 pa-0"
      >
        <v-btn
          color="secondary"
          block
          :disabled="!validation"
          @click="reset"
        >
          {{ $t('action.SAVE') }}
        </v-btn>
      </v-card-actions>
    </div>
  </v-card>

</template>

<script>
import useRules from '@/composables/rules'
import { useError } from '@/composables/error'

export default {
  setup() {
    const { password, rules } = useRules()
    return { password, rules }
  },
  data() {
    return {
      done: false,
      validation: false,
      passwordConfirm: null,
      showPassword: false,
      uid: null,
      token: null,
    }
  },
  methods: {
    reset() {
      const vm = this

      this.$axios({
        method: this.$api('ACCOUNTS_PASSWORD_RESET').method,
        url: this.$api('ACCOUNTS_PASSWORD_RESET').url,
        data: {
          new_password: this.passwordConfirm,
          uid: this.$route.params.uid,
          token: this.$route.params.token,
        },
      })
      .then(function (response) {
        vm.done = true
      })
      .catch(function (error) {
        vm.$toast.error(useError(error, 'ACCOUNTS_PASSWORD_RESET'))
      })
    }
  }
}
</script>
