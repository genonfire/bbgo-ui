<template>
  <div
    v-if="user"
  >
    <v-card
      class="mx-auto mt-3 pa-6 pt-2"
      max-width="500"
    >
      <v-card-title
        class="mb-4 text-h5 font-weight-bold text-center"
      >
        {{ $t('menu.PROFILE') }}
      </v-card-title>

      <v-form
        v-model="validation"
      >
        <v-row>
          <v-card
            flat
            class="ml-3"
            v-if="user.photo"
          >
            <v-img
              :src="user.photo"
              width="80"
              height="80"
            ></v-img>
          </v-card>

          <v-card
            flat
            width="80"
            height="80"
            class="ml-3"
            v-else
          >
            <v-icon
              size="x-large"
              class="pa-10"
              icon="mdi-account-outline"
            >
            </v-icon>
          </v-card>

          <div
            class="py-6 ml-10"
          >
            <v-btn
              variant="outlined"
              color="secondary"
              @click="uploadPhoto"
            >
              {{ $t('accounts.UPLOAD_PHOTO') }}
            </v-btn>
            <v-file-input
              v-model="files"
              accept="image/*"
              ref="fileInput"
              @change="handleFileChange"
              style="display:none;"
            ></v-file-input>
            <v-btn
              variant="text"
              color="pale"
              class="ml-4"
              @click="deletePhoto"
            >
              {{ $t('action.REMOVE') }}
            </v-btn>
          </div>
        </v-row>

        <v-row
          class="mt-4"
        >
          <v-col>
            <div class="text-body-2 font-weight-medium">
              {{ $t('accounts.USERNAME') }}
            </div>
            <v-text-field
              v-model="user.username"
              density="compact"
              prepend-inner-icon="mdi-email-outline"
              disabled
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row
          class="my-0"
        >
          <v-col>
            <div class="text-body-2 font-weight-medium">
              {{ $t('accounts.FIRST_NAME' )}}
            </div>
            <v-text-field
              v-model="user.first_name"
              density="compact"
              :rules="[rules.required]"
            ></v-text-field>
          </v-col>
          <v-col>
            <div class="text-body-2 font-weight-medium">
              {{ $t('accounts.LAST_NAME' )}}
            </div>
            <v-text-field
              v-model="user.last_name"
              density="compact"
              :rules="[rules.required]"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row
          class="my-0"
        >
          <v-col>
            <div class="text-body-2 font-weight-medium">
              {{ $t('accounts.CALL_NAME') }}
            </div>
            <v-text-field
              v-model="user.call_name"
              density="compact"
              :rules="[rules.required]"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row
          class="my-0"
        >
          <v-col>
            <div class="text-body-2 font-weight-medium">
              {{ $t('accounts.TEL') }}
            </div>
            <v-text-field
              v-model="user.tel"
              density="compact"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row
          class="my-0"
        >
          <v-col>
            <div class="text-body-2 font-weight-medium">
              {{ $t('accounts.ADDRESS') }}
            </div>
            <v-text-field
              v-model="user.address"
              density="compact"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-card-actions
          class="my-0 pa-0"
        >
          <v-btn
            color="secondary"
            block
            :disabled="!validation"
            @click="save"
          >
            {{ $t('action.SAVE') }}
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </div>
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
      validation: false,
      user: null,
      files: null,
    }
  },
  mounted() {
    const vm = this

    this.$axios({
      method: this.$api('ACCOUNTS_GET_PROFILE').method,
      url: this.$api('ACCOUNTS_GET_PROFILE').url,
    })
    .then(function (response) {
      vm.user = response.data['data']
    })
    .catch(function (error) {
      vm.$toast.error(useError(error, 'ACCOUNTS_GET_PROFILE'))
    })
  },
  methods: {
    updatePhoto(data) {
      var vm = this

      this.$axios({
        method: this.$api('ACCOUNTS_EDIT_PROFILE').method,
        url: this.$api('ACCOUNTS_EDIT_PROFILE').url,
        data: data,
      })
      .then(function (response) {
        vm.user = response.data['data']
        vm.$store.setUser(response.data['data'])
      })
      .catch(function (error) {
        vm.$toast.error(useError(error, 'ACCOUNTS_EDIT_PROFILE'))
      })
    },
    deletePhoto() {
      this.updatePhoto({ photo: null })
      this.files = null
    },
    uploadPhoto() {
      this.$refs.fileInput.click();
    },
    handleFileChange() {
      if (this.files) {
        let formData = new FormData()
        formData.append('photo', this.files[0])
        this.updatePhoto(formData)
      }
    },
    save() {
      var vm = this

      this.$axios({
        method: this.$api('ACCOUNTS_EDIT_PROFILE').method,
        url: this.$api('ACCOUNTS_EDIT_PROFILE').url,
        data: {
          first_name: this.user.first_name,
          last_name: this.user.last_name,
          call_name: this.user.call_name,
          tel: this.user.tel,
          address: this.user.address
        },
      })
      .then(function (response) {
        vm.user = response.data['data']
        vm.$store.setUser(response.data['data'])
        vm.$toast.success(vm.$t('message.SAVED_SUCCESSFULLY'))
      })
      .catch(function (error) {
        vm.$toast.error(useError(error, 'ACCOUNTS_EDIT_PROFILE'))
      })
    },
  }
}
</script>
