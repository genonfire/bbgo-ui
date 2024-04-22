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
        {{ $t('forum.THREADS') }}
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
          :placeholder="$t('hint.SEARCH_NAME_TITLE_CONTENTS')"
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
          :getItems="getThreads"
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
              <th>{{ $t('forum.THREAD_TITLE') }}</th>
              <th>{{ $t('forum.THREAD_USER') }}</th>
              <th>{{ $t('common.DATE_CREATED') }}</th>
              <th>{{ $t('common.ACTIVE') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="thread in threads"
              :key="thread.id"
            >
              <td>{{ thread.id }}</td>
              <td>{{ thread.forum_name }}</td>
              <td>
                <router-link
                  :to="{
                    name: 'thread.read',
                    params: {
                      forum: thread.forum_name,
                      thread: thread.id,
                      title: thread.title.replace(/ /g, '_')
                    }
                  }"
                >
                  {{ thread.title }}
                  <span
                    v-if="thread.reply_count"
                    class="font-weight-bold"
                    style="color: #2384e2;"
                  >
                    [{{ thread.reply_count }}]
                  </span>
                </router-link>
              </td>
              <td>{{ thread.user.call_name }}</td>
              <td>{{ formatDateTime(thread.created_at) }}</td>
              <td>
                <v-icon
                  icon="mdi-check-circle-outline"
                  color="success"
                  v-if="!thread.is_deleted"
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
      :getItems="getThreads"
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
import { useFormatDate } from '@/composables/datetime'

export default {
  setup() {
    const { formatDateTime } = useFormatDate()
    return { formatDateTime }
  },
  components: {
    NumberPagination,
    ActiveSelector,
  },
  data() {
    return {
      threads: [],
      pagination : null,
      pageSize: 20,
      active: null,
      search: null,
      init: false,
    }
  },
  computed: {
    delete() {
      if (this.active == 'false') {
        return true
      }
      else {
        return false
      }
    },
  },
  mounted() {
    this.getThreads()
  },
  methods: {
    getThreads(page=1) {
      const vm = this

      let q = ''
      if (this.search) {
        q = '&q=' + this.search
      }

      let active = ''
      if (this.active) {
        active = '&delete=' + this.delete
      }

      let url = `${this.$api('ADMIN_THREADS').url}?page_size=${this.pageSize}&page=${page}${active}${q}`

      this.$axios({
        method: this.$api('ADMIN_THREADS').method,
        url: url,
      })
      .then(function (response) {
        vm.pagination = response.data['pagination']
        vm.threads = response.data['data']

        vm.init = true
      })
      .catch(function (error) {
        vm.$toast.error(vm.$error(error, 'ADMIN_THREADS'))
      })
    },
    onEnter() {
      this.getThreads()
    },
    goThread(thread) {
      this.$router.push({
        name: 'thread.read',
        params: {
          forum: thread.forum_name,
          thread: thread.id,
          title: thread.title.replace(/ /g, '_')
        }
      })
    },
  }
}
</script>
