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
        <router-link
          :to="{ name: 'thread' }"
        >
          {{ forum.title }}
        </router-link>
        <p
          class="pl-2 text-body-2"
        >
          {{ forum.description }}
        </p>
      </v-col>
      <v-col
        cols="3"
        class="py-2 d-flex justify-end"
      >
        <v-btn
          variant="outlined"
          prepend-icon="mdi-pencil-outline"
          color="secondary"
          @click="newThread"
          :disabled="!forum.permissions.write"
        >
          {{ $t('action.WRITE') }}
        </v-btn>
        <v-tooltip
          location="bottom"
          :text="$t('forum.THREAD_TRASH')"
          v-if="$store.isStaff"
        >
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              icon="mdi-trash-can-outline"
              density="comfortable"
              variant="text"
              color="pale"
              class="ml-1"
              @click="$router.push(
                {
                  name: 'thread.trash',
                  params: {
                    forum: forum.name
                  }
                }
              )"
            >
            </v-btn>
          </template>
        </v-tooltip>
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
              <th>{{ $t('common.PK') }}</th>
              <th class="text-center">{{ $t('forum.THREAD_TITLE') }}</th>
              <th>{{ $t('forum.THREAD_USER') }}</th>
              <th width="120">{{ $t('common.DATE') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="thread in threads"
              :key="thread.id"
              :class="thread.is_pinned ? 'font-weight-bold' : ''"
            >
              <td>{{ thread.id }}</td>
              <td>
                <router-link
                  :to="{
                    name: 'thread.read',
                    params: {
                      forum: forum.name,
                      thread: thread.id,
                      title: escapeTitle(thread.title)
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
              <td>{{ getUsername(thread) }}</td>
              <td>{{ formatDateOrTime(thread.date_or_time) }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
    </v-row>

    <NumberPagination
      :pagination="pagination"
      :getItems="threadPage"
      :page="parseInt(page)"
    />

  </v-container>
</template>

<script>
import NumberPagination from '@/components/NumberPagination'
import { useFormatDate } from '@/composables/datetime'

export default {
  setup() {
    const { formatDateOrTime } = useFormatDate()
    return { formatDateOrTime }
  },
  components: {
    NumberPagination,
  },
  data() {
    return {
      forum: null,
      threads: [],
      pagination : null,
      pageSize: 20,
      page: 1,
      init: false,
    }
  },
  mounted() {
    if (this.$route.params.page) {
      this.page = this.$route.params.page
    }
    this.getThreads(this.page, this.$route.query.q)
  },
  methods: {
    threadPage(page=1) {
      this.$router.push({
        name: 'thread.page',
        params: {
          forum: this.forum.name,
          page: page,
        },
        query: {
          q: this.$route.query.q
        }
      })
    },
    getUsername(thread) {
      if (thread.user) {
        return thread.user.call_name
      }
      else {
        return thread.name
      }
    },
    escapeTitle(title) {
      return title.replace(/ /g, '_')
    },
    getThreads(page=1, search=null) {
      const vm = this

      let q = ''
      if (search) {
        q = '&q=' + search
      }

      let url = `${this.$api('THREAD_LIST').url}?page_size=${this.pageSize}&page=${page}${q}`

      this.$axios({
        method: this.$api('THREAD_LIST').method,
        url: url.replace('{forum}', this.$route.params.forum),
      })
      .then(function (response) {
        vm.pagination = response.data['pagination']
        vm.forum = response.data['data']['forum']
        vm.threads = response.data['data']['threads']

        vm.init = true
      })
      .catch(function (error) {
        vm.$toast.error(vm.$error(error, 'THREAD_LIST'))
      })
    },
    newThread() {
      this.$router.push({
        name: 'thread.write',
        params: {
          forum: this.$route.params.forum
        }
      })
    },
  }
}
</script>

<style scoped>
  table {
    width: 100%;
    table-layout: fixed;
  }
</style>
