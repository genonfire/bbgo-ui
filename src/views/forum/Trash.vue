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
          {{ $t('forum.THREAD_TRASH') }}
        </p>
      </v-col>
      <v-col
        cols="3"
        class="text-right py-2"
      >
        <v-btn
          variant="outlined"
          prepend-icon="mdi-arrow-left"
          color="secondary"
          @click="$router.back()"
        >
          {{ $t('action.BACK') }}
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-table
          density="compact"
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
                      title: title(thread.title)
                    }
                  }"
                >
                  {{ thread.title }}
                </router-link>
              </td>
              <td>{{ username(thread) }}</td>
              <td>{{ formatDateOrTime(thread.date_or_time) }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
    </v-row>

    <NumberPagination
      :pagination="pagination"
      :getItems="trashPage"
      :page="parseInt(page)"
    />

  </v-container>
</template>

<script>
import NumberPagination from '@/components/NumberPagination'
import { useFormatDate } from '@/composables/datetime'
import { useUser } from '@/composables/user'
import { useEscape } from '@/composables/escape'

export default {
  setup() {
    const { formatDateOrTime } = useFormatDate()
    const { username } = useUser()
    const { title } = useEscape()
    return { formatDateOrTime, username, title }
  },
  components: {
    NumberPagination,
  },
  data() {
    return {
      forum: null,
      threads: [],
      pagination : null,
      pageSize: 100,
      page: 1,
      init: false,
    }
  },
  mounted() {
    if (this.$route.params.page) {
      this.page = this.$route.params.page
    }
    this.getTrash(this.page, this.$route.query.q)
  },
  methods: {
    trashPage(page=1) {
      this.$router.push({
        name: 'thread.trash.page',
        params: {
          forum: this.forum.name,
          page: page,
        },
        query: {
          q: this.$route.query.q
        }
      })
    },
    getTrash(page=1, search=null) {
      const vm = this

      let q = ''
      if (search) {
        q = '&q=' + search
      }

      let url = `${this.$api('THREAD_TRASH').url}?page_size=${this.pageSize}&page=${page}${q}`

      this.$axios({
        method: this.$api('THREAD_TRASH').method,
        url: url.replace('{forum}', this.$route.params.forum),
      })
      .then(function (response) {
        vm.pagination = response.data['pagination']
        vm.forum = response.data['data']['forum']
        vm.threads = response.data['data']['threads']

        vm.init = true
      })
      .catch(function (error) {
        vm.$toast.error(vm.$error(error, 'THREAD_TRASH'))
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
