<template>
  <v-card
    class="mx-auto mt-3 pa-6 pt-2"
    max-width="500"
  >
    <v-card-title
      class="mb-4 text-h5 font-weight-bold text-center"
    >
      {{ $t('menu.FIND_PASSWORD') }}
    </v-card-title>

    <div
      v-if="done"
    >
      <v-sheet
      >
        {{ $t('hint.PASSWORD_EMAIL_DESCRIPTION') }}
      </v-sheet>
    </div>

    <div
      v-else
    >
      <v-sheet
        class="mx-2"
      >
        {{ $t('hint.PASSWORD_FIND_DESCRIPTION') }}
      </v-sheet>

      <v-form
        v-model="validation"
      >
        <div
          class="mt-5"
        >
          <div class="text-body-2 font-weight-medium">
            {{ $t('accounts.USERNAME') }}
          </div>
          <v-text-field
            v-model="email"
            density="compact"
            prepend-inner-icon="mdi-email-outline"
            :rules="[rules.required, rules.emailRules]"
          ></v-text-field>
        </div>
      </v-form>

      <v-card-actions
        class="mt-0 pa-0"
      >
        <v-btn
          color="secondary"
          block
          :disabled="!validation"
          @click="find"
        >
          {{ $t('action.SEND') }}
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
    const { rules } = useRules()
    return { rules }
  },
  data() {
    return {
      done: false,
      validation: false,
      email: null,
    }
  },
  methods: {
    find() {
      const vm = this

      this.$axios({
        method: this.$api('ACCOUNTS_PASSWORD_FIND').method,
        url: this.$api('ACCOUNTS_PASSWORD_FIND').url,
        data: {
          email: this.email,
        },
      })
      .then(function (response) {
        vm.done = true
      })
      .catch(function (error) {
        vm.$toast.error(useError(error, 'ACCOUNTS_PASSWORD_FIND'))
      })
    }
  }
}
</script>
