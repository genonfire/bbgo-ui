<template>
  <v-card
    class="mx-auto mt-3 pa-6 pt-2"
    max-width="500"
  >
    <v-card-title
      class="mb-4 text-h5 font-weight-bold text-center"
    >
      {{ $t('menu.DELETE_ACCOUNT') }}
    </v-card-title>

    <div
      v-if="done"
    >
      <v-sheet
      >
        {{ $t('hint.DELETE_ACCOUNT_COMPLETE') }}
      </v-sheet>
    </div>

    <div
      v-else
    >
      <v-sheet
        class="mx-2"
      >
        {{ $t('hint.DELETE_ACCOUNT_DESCRIPTION') }}
      </v-sheet>

      <v-form
        v-model="validation"
      >
        <div
          class="mt-5"
        >
          <v-checkbox
            v-model="consent"
            density="compact"
            color="secondary"
            :rules="[rules.required]"
            hide-details
          >
            <template v-slot:label>
              <span
                class="ml-1 text-subtitle-2"
              >
                {{ $t('hint.DELETE_ACCOUNT_CONSENT') }}
              </span>
            </template>
          </v-checkbox>
        </div>
      </v-form>

      <v-card-actions
        class="mt-5 pa-0"
      >
        <v-btn
          color="secondary"
          block
          :disabled="!validation"
          @click="deleteAccount"
        >
          {{ $t('action.DELETE_ACCOUNT') }}
        </v-btn>
      </v-card-actions>
    </div>
  </v-card>

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
      done: false,
      validation: false,
      consent: false,
    }
  },
  methods: {
    deleteAccount() {
      const vm = this

      this.$axios({
        method: this.$api('ACCOUNTS_DEACTIVATE').method,
        url: this.$api('ACCOUNTS_DEACTIVATE').url,
        data: {
          consent: this.consent,
        },
      })
      .then(function (response) {
        vm.$axios.defaults.headers.common['Authorization'] = ''
        vm.$store.logout()
        vm.done = true
      })
      .catch(function (error) {
        vm.$toast.error(vm.$error(error, 'ACCOUNTS_DEACTIVATE'))
      })
    }
  }
}
</script>
