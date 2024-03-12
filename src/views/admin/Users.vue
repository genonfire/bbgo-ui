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
          @click="exportExcel"
        >
          {{ $t('action.EXPORT') }}
        </v-btn>
      </v-col>
    </v-row>
    <v-row
      class="py-2"
    >
      <v-col
      >
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
          <v-select
            v-model="active"
            clearable
            variant="outlined"
            density="compact"
            :label="$t('accounts.ACTIVE')"
            :items="activeItems"
            item-title="text"
            item-value="value"
            @update:modelValue="onUpdateActive"
          ></v-select>
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
              <th>{{ $t('accounts.ACTIVE') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="user in users"
              :key="user.id"
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

    <v-row
      class="pt-5"
    >
      <v-col
        cols="2"
        class="pt-3 hidden-sm-and-down"
      >
        {{ tallyItems }}
      </v-col>
      <v-col
      >
        <v-pagination
          v-model="page"
          :length="pagination.page_total"
          :total-visible="6"
          variant="flat"
          active-color="secondary"
          density="comfortable"
          @click="onPageClick"
        >
        </v-pagination>
      </v-col>
      <v-col
        cols="2"
        class="text-right hidden-sm-and-down"
      >
        <v-select
          v-model="pageSize"
          variant="outlined"
          density="compact"
          :items="pageSizeItems"
          item-title="text"
          item-value="value"
          @update:modelValue="onUpdatePageSize"
        ></v-select>
      </v-col>
    </v-row>
  </v-container>

  <v-progress-linear
    indeterminate
    :height="4"
    color="secondary"
    v-else
  ></v-progress-linear>
</template>

<script>
import { useError } from '@/composables/error'
import { useFormatDate } from '@/composables/datetime'
import { useDownload } from '@/composables/download'

export default {
  setup() {
    const { formatDateTime, formatDate } = useFormatDate()
    return { formatDateTime, formatDate }
  },
  data() {
    return {
      users: [],
      pagination : null,
      staff: false,
      active: null,
      activeItems: [
        {
          text: this.$t('common.YES'),
          value: 'true'
        },
        {
          text: this.$t('common.NO'),
          value: 'false'
        }
      ],
      pageSize: {
        text: this.$t('hint.PAGESIZE_BY', { pageSize: 20 }),
        value: 20
      },
      pageSizeItems: [
        {
          text: this.$t('hint.PAGESIZE_BY', { pageSize: 20 }),
          value: 20
        },
        {
          text: this.$t('hint.PAGESIZE_BY', { pageSize: 50 }),
          value: 50
        },
        {
          text: this.$t('hint.PAGESIZE_BY', { pageSize: 100 }),
          value: 100
        }
      ],
      page: 1,
      search: null,
      init: false,
    }
  },
  computed: {
    tallyItems() {
      return this.$t('hint.TALLY_ITEMS', { total: this.pagination.item_total })
    }
  },
  mounted() {
    this.getUsers()
  },
  methods: {
    getUsers() {
      const vm = this

      let api = 'ADMIN_USERS'
      if (this.staff) {
        api = 'ADMIN_STAFFS'
      }

      let q = ''
      if (this.search) {
        q = '&q=' + this.search
      }

      let url = `${this.$api(api).url}?page_size=${this.pageSize}&page=${this.page}&active=${this.active}&${q}`

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
        vm.$toast.error(useError(error, api))
      })
    },
    onTabUpdate() {
      this.page = 1
      this.active = null
      this.search = null
      this.getUsers()
    },
    onPageClick() {
      this.getUsers()
    },
    onEnter() {
      this.getUsers()
    },
    onUpdateActive() {
      this.page = 1
      this.getUsers()
    },
    onUpdatePageSize() {
      this.page = 1
      this.getUsers()
    },
    exportExcel() {
      const api = this.$api('ADMIN_EXPORT_USERS')
      useDownload(api.method, api.url, 'users')
    }
  }
}
</script>
