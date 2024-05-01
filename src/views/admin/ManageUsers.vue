<template>
  <v-container
    v-if="init"
  >
    <v-row
      style="border-bottom: 1px solid #DEE1E6FF;"
    >
      <v-col
        class="text-h5 font-weight-bold py-2"
      >
        <span
          v-if="staff"
        >
          {{ $t('accounts.STAFFS') }}
        </span>
        <span
          v-else
        >
          {{ $t('accounts.USERS') }}
        </span>
      </v-col>
      <v-col
        class="text-right py-2"
      >
        <v-btn
          variant="outlined"
          prepend-icon="mdi-microsoft-excel"
          color="secondary"
          :disabled="staff"
          @click="exportExcel"
        >
          {{ $t('action.EXPORT') }}
        </v-btn>
      </v-col>
    </v-row>

    <v-row
      class="py-2"
    >
      <v-col>
        <v-tabs
          v-model="staff"
          density="comfortable"
          color="secondary"
          @update:model-value="onTabUpdate"
        >
          <v-tab :value="false">{{ $t('accounts.USERS') }}</v-tab>
          <v-tab :value="true">{{ $t('accounts.STAFFS') }}</v-tab>
        </v-tabs>
      </v-col>
      <v-col
        class="px-0"
      >
          <v-text-field
            v-model="search"
            variant="outlined"
            density="compact"
            hide-details
            prepend-inner-icon="mdi-magnify"
            :placeholder="$t('hint.SEARCH_USERNAME_NAME')"
            @keydown.enter="onEnter"
          >
          </v-text-field>
      </v-col>
      <v-col
        cols="2"
        class="ml-1 pl-0 pr-3 hidden-sm-and-down"
      >
        <ActiveSelector
          v-model="active"
          :getItems="getUsers"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-table
          density="comfortable"
          :hover="true"
        >
          <thead>
            <tr>
              <th>{{ $t('common.ID') }}</th>
              <th>{{ $t('accounts.USERNAME') }}</th>
              <th>{{ $t('accounts.CALL_NAME') }}</th>
              <th>{{ $t('accounts.DATE_JOINED') }}</th>
              <th>{{ $t('accounts.LAST_LOGIN') }}</th>
              <th>{{ $t('common.ACTIVE') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="user in users"
              :key="user.id"
              @click="editUser(user)"
              style="cursor:pointer"
            >
              <td>{{ user.id }}</td>
              <td>{{ user.username }}</td>
              <td>{{ user.call_name }}</td>
              <td>{{ formatDate(user.date_joined) }}</td>
              <td>{{ formatDateTime(user.last_login) }}</td>
              <td>
                <v-icon
                  icon="mdi-check-circle-outline"
                  color="success"
                  v-if="user.is_active"
                ></v-icon>
                <v-icon
                  icon="mdi-close-circle-outline"
                  color="error"
                  v-else
                ></v-icon>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
    </v-row>

    <NumberPagination
      v-model="pageSize"
      :pagination="pagination"
      :getItems="getUsers"
    />

    <v-dialog
      v-model="dialog"
      max-width="500"
      v-if="user"
    >
      <v-card
        width="100%"
        class="mx-auto mt-3 pa-6 pt-2"
      >
        <v-card-title
          class="mb-4 text-h6 font-weight-bold text-center"
        >
          {{ user.username }}
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
                v-model="file"
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

          <v-row
            class="my-0"
          >
            <v-col>
              <div class="text-body-2 font-weight-medium">
                {{ $t('accounts.DATE_JOINED') }}
              <v-text-field
                :placeholder="formatDate(user.date_joined)"
                density="compact"
                readonly
              ></v-text-field>
              </div>
            </v-col>
          </v-row>

          <v-row
            class="my-0"
          >
            <v-col>
              <div class="text-body-2 font-weight-medium">
                {{ $t('accounts.LAST_LOGIN') }}
                <v-text-field
                  :placeholder="formatDateTime(user.last_login)"
                  density="compact"
                  readonly
                ></v-text-field>
              </div>
            </v-col>
          </v-row>

          <v-row
            class="my-0"
          >
            <v-col
            >
              <v-switch
                v-model="user.is_active"
                color="secondary"
              >
                <template v-slot:prepend>
                  <span
                    class="mr-8"
                  >
                    {{ $t('common.ACTIVE') }}
                  </span>
                </template>
              </v-switch>
            </v-col>
            <v-col
              v-if="staff"
            >
              <v-switch
                v-model="user.is_staff"
                color="secondary"
              >
                <template v-slot:prepend>
                  <span
                    class="mr-8"
                  >
                    {{ $t('accounts.STAFF') }}
                  </span>
                </template>
              </v-switch>
            </v-col>
            <v-col
              v-else
            >
              <v-switch
                v-model="user.is_approved"
                color="secondary"
              >
                <template v-slot:prepend>
                  <span
                    class="mr-8"
                  >
                    {{ $t('accounts.APPROVED') }}
                  </span>
                </template>
              </v-switch>
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

          <v-row
            class="mt-2"
          >
            <v-spacer></v-spacer>
            <v-dialog
              v-model="deleteDialog"
              max-width="400"
              persistent
            >
              <template v-slot:activator="{ props: activatorProps }">
                <v-btn
                  v-bind="activatorProps"
                  variant="text"
                  color="pale"
                  size="small"
                  v-if="user.is_active"
                >
                  {{ $t('action.DELETE_USER') }}
                </v-btn>
              </template>

              <v-card
                :title="$t('accounts.DELETE_USER')"
                :text="$t('hint.DELETE_USER_DESCRIPTION')"
              >
                <template v-slot:prepend>
                  <v-icon
                    icon="mdi-alert"
                    color="secondary"
                  ></v-icon>
                </template>
                <template v-slot:actions>
                  <v-spacer></v-spacer>

                  <v-btn
                    variant="outlined"
                    color="pale"
                    @click="deleteDialog = false"
                  >
                    {{ $t('action.CANCEL') }}
                  </v-btn>

                  <v-btn
                    color="secondary"
                    @click="deleteUser"
                  >
                    {{ $t('action.DELETE_USER') }}
                  </v-btn>
                </template>
              </v-card>
            </v-dialog>
          </v-row>
        </v-form>
      </v-card>
    </v-dialog>

  </v-container>

  <v-progress-linear
    indeterminate
    :height="4"
    color="secondary"
    v-else
  ></v-progress-linear>
</template>

<script>
import NumberPagination from '@/components/NumberPagination'
import ActiveSelector from '@/components/ActiveSelector'
import useRules from '@/composables/rules'
import { useFormatDate } from '@/composables/datetime'
import { useDownload } from '@/composables/download'

export default {
  setup() {
    const { rules } = useRules()
    const { formatDateTime, formatDate } = useFormatDate()
    return { formatDateTime, formatDate, rules }
  },
  components: {
    NumberPagination,
    ActiveSelector,
  },
  data() {
    return {
      dialog: false,
      deleteDialog: false,
      users: [],
      user: null,
      file: null,
      pagination : null,
      pageSize: 20,
      active: null,
      search: null,
      staff: false,
      validation: false,
      init: false,
    }
  },
  mounted() {
    this.getUsers()
  },
  methods: {
    getUsers(page=1) {
      const vm = this

      let api = 'ADMIN_USERS'
      if (this.staff) {
        api = 'ADMIN_STAFFS'
      }

      let q = ''
      if (this.search) {
        q = '&q=' + this.search
      }

      let active = ''
      if (this.active) {
        active = '&active=' + this.active
      }

      let url = `${this.$api(api).url}?page_size=${this.pageSize}&page=${page}${active}${q}`

      this.$axios({
        method: this.$api(api).method,
        url: url,
      })
      .then(function (response) {
        vm.pagination = response.data['pagination']
        vm.users = response.data['data']

        vm.init = true
      })
      .catch(function (error) {
        vm.$toast.error(vm.$error(error, api))
      })
    },
    onTabUpdate() {
      this.active = null
      this.search = null
      this.getUsers()
    },
    onEnter() {
      this.getUsers()
    },
    exportExcel() {
      const api = this.$api('ADMIN_EXPORT_USERS')
      useDownload(api.method, api.url, 'users')
    },
    getUser(pk) {
      const vm = this

      let api = 'ADMIN_USER'
      if (this.staff) {
        api = 'ADMIN_STAFF'
      }

      this.$axios({
        method: this.$api(api).method,
        url: this.$api(api).url.replace('{pk}', pk),
      })
      .then(function (response) {
        vm.user = response.data['data']
      })
      .catch(function (error) {
        vm.$toast.error(vm.$error(error, api))
      })
    },
    editUser(user) {
      this.getUser(user.id)
      this.dialog = true
    },
    deleteUser() {
      var vm = this

      let api = 'ADMIN_DELETE_USER'
      if (this.staff) {
        api = 'ADMIN_DELETE_STAFF'
      }

      this.$axios({
        method: this.$api(api).method,
        url: this.$api(api).url.replace('{pk}', this.user.id),
      })
      .then(function (response) {
        vm.deleteDialog = false
        vm.dialog = false
        vm.user = null
        vm.getUsers()
        vm.$toast.success(vm.$t('message.DELETED_SUCCESSFULLY'))
      })
      .catch(function (error) {
        vm.$toast.error(vm.$error(error, api))
      })
    },
    updatePhoto(data) {
      var vm = this

      let api = 'ADMIN_EDIT_USER'
      if (this.staff) {
        api = 'ADMIN_EDIT_STAFF'
      }

      this.$axios({
        method: this.$api(api).method,
        url: this.$api(api).url.replace('{pk}', this.user.id),
        data: data,
      })
      .then(function (response) {
        vm.user = response.data['data']
      })
      .catch(function (error) {
        vm.$toast.error(vm.$error(error, api))
      })
    },
    deletePhoto() {
      this.updatePhoto({ photo: null })
      this.file = null
    },
    uploadPhoto() {
      this.$refs.fileInput.click();
    },
    handleFileChange() {
      if (this.file) {
        let formData = new FormData()
        formData.append('photo', this.file)
        this.updatePhoto(formData)
      }
    },
    save() {
      var vm = this

      let api = 'ADMIN_EDIT_USER'
      let data = {
        first_name: this.user.first_name,
        last_name: this.user.last_name,
        call_name: this.user.call_name,
        tel: this.user.tel,
        address: this.user.address,
        is_active: this.user.is_active,
      }

      if (this.staff) {
        api = 'ADMIN_EDIT_STAFF'
        data['is_staff'] = this.user.is_staff
      }
      else {
        data['is_approved'] = this.user.is_approved
      }


      this.$axios({
        method: this.$api(api).method,
        url: this.$api(api).url.replace('{pk}', this.user.id),
        data: data,
      })
      .then(function (response) {
        vm.user = response.data['data']
        vm.$toast.success(vm.$t('message.SAVED_SUCCESSFULLY'))
      })
      .catch(function (error) {
        vm.$toast.error(vm.$error(error, api))
      })
    },
  }
}
</script>
