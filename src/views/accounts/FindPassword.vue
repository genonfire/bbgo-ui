<template>
  <v-card
    class="mx-auto mt-3 pa-6 pt-2"
    width="500"
  >
    <v-card-title
      class="mb-4 text-h5 font-weight-bold text-center"
    >
      {{ $t('menu.FIND_PASSWORD') }}
    </v-card-title>

    <div
      v-if="sent"
    >
      <v-sheet
      >
        {{ $t('hint.PASSWORD_EMAIL_DESCRIPTION')}}
      </v-sheet>
    </div>

    <div
      v-else
    >
      <v-sheet
        class="mx-2"
      >
        {{ $t('hint.PASSWORD_FIND_DESCRIPTION')}}
      </v-sheet>

      <v-form
        v-model="validation"
      >
        <div
          class="mt-5"
        >
          <div class="text-body-2 font-weight-medium">
            {{ $t('common.USER_USERNAME') }}
          </div>
          <v-text-field
            v-model="email"
            density="compact"
            prepend-inner-icon="mdi-email-outline"
            :placeholder="$t('hint.ENTER_YOUR_EMAIL')"
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
export default {
  data() {
    return {
      sent: false,
      validation: false,
      email: '4@a.com',
      rules: {
        required: v => !!v || this.$t('error.REQUIRED_FIELD'),
        emailRules: v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || this.$t('error.INVALID_EMAIL'),
      },
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
        vm.sent = true
      })
      .catch(function (error) {
        if (error.response && error.response.data['error']) {
          vm.$toast.error(error.response.data['error']['message'])
        }
      })
    }
  }
}
</script>
