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
        {{ $t('forum.FORUMS') }}
      </v-col>
      <v-col
        class="text-right py-2"
      >
        <v-btn
          variant="outlined"
          prepend-icon="mdi-plus"
          color="secondary"
          @click="newForum"
        >
          {{ $t('action.NEW') }}
        </v-btn>
      </v-col>
    </v-row>

    <v-row
      class="py-2"
    >
      <v-col>
        <v-text-field
          v-model="search"
          variant="outlined"
          density="compact"
          hide-details
          prepend-inner-icon="mdi-magnify"
          :placeholder="$t('hint.SEARCH_NAME_TITLE')"
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
          :getItems="getForums"
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
              <th>{{ $t('forum.FORUM_NAME') }}</th>
              <th>{{ $t('forum.FORUM_TITLE') }}</th>
              <th>{{ $t('forum.THREAD_COUNT') }}</th>
              <th>{{ $t('forum.REPLY_COUNT') }}</th>
              <th>{{ $t('common.DATE_CREATED') }}</th>
              <th>{{ $t('common.ACTIVE') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="forum in forums"
              :key="forum.id"
              @click="editForum(forum)"
              style="cursor:pointer"
            >
              <td>{{ forum.id }}</td>
              <td>{{ forum.name }}</td>
              <td>{{ forum.title }}</td>
              <td>{{ forum.thread_count }}</td>
              <td>{{ forum.reply_count }}</td>
              <td>{{ formatDate(forum.created_at) }}</td>
              <td>
                <v-icon
                  icon="mdi-check-circle-outline"
                  color="success"
                  v-if="forum.is_active"
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
      :getItems="getForums"
    />
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
import { useError } from '@/composables/error'
import { useFormatDate } from '@/composables/datetime'

export default {
  setup() {
    const { rules } = useRules()
    const { formatDateTime, formatDate } = useFormatDate()
    return { formatDateTime, formatDate ,rules }
  },
  components: {
    NumberPagination,
    ActiveSelector,
  },
  data() {
    return {
      dialog: false,
      forums: [],
      forum: null,
      pagination : null,
      pageSize: 20,
      active: null,
      search: null,
      validation: false,
      init: false,
    }
  },
  mounted() {
    this.getForums()
  },
  methods: {
    getForums(page=1) {
      const vm = this

      let q = ''
      if (this.search) {
        q = '&q=' + this.search
      }

      let active = ''
      if (this.active) {
        active = '&active=' + this.active
      }

      let url = `${this.$api('FORUMS').url}?page_size=${this.pageSize}&page=${page}${active}${q}`

      this.$axios({
        method: this.$api('FORUMS').method,
        url: url,
      })
      .then(function (response) {
        vm.pagination = response.data['pagination']
        vm.forums = response.data['data']

        vm.init = true
      })
      .catch(function (error) {
        vm.$toast.error(useError(error, 'FORUMS'))
      })
    },
    onEnter() {
      this.getForums()
    },
    newForum() {
    },
    getForum(pk) {
    },
    editForum(forum) {
    },
    deleteForum() {
    },
    save() {
    },
  }
}
</script>
