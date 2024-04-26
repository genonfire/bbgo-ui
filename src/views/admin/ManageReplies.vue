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
        {{ $t('forum.REPLIES') }}
      </v-col>
    </v-row>

    <v-row
      class="py-2"
    >
      <v-col>
        <v-tabs
          v-model="section"
          density="comfortable"
          color="secondary"
          @update:model-value="onTabUpdate"
        >
          <v-tab value="threads">{{ $t('forum.THREADS') }}</v-tab>
          <v-tab value="replies">{{ $t('forum.REPLIES') }}</v-tab>
        </v-tabs>
      </v-col>
      <v-col>
        <v-text-field
          v-model="search"
          variant="outlined"
          density="compact"
          hide-details
          prepend-inner-icon="mdi-magnify"
          :placeholder="$t('hint.SEARCH_NAME_CONTENTS')"
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
          :getItems="getReplies"
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
              <th>{{ $t('forum.CONTENT') }}</th>
              <th>{{ $t('forum.THREAD_USER') }}</th>
              <th>{{ $t('common.DATE_CREATED') }}</th>
              <th>{{ $t('common.ACTIVE') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="reply in replies"
              :key="reply.id"
              :style="reply.is_deleted ? { opacity: 0.5 } : ''"
            >
              <td>{{ reply.id }}</td>
              <td>{{ reply.forum_name }}</td>
              <td>
                <router-link
                  :to="{
                    name: 'thread.reply',
                    params: {
                      forum: reply.forum_name,
                      thread: reply.thread.id,
                      reply:reply.id,
                      title: reply.thread.title.replace(/ /g, '_')
                    }
                  }"
                >
                  {{ reply.content }}
                </router-link>
              </td>
              <td>{{ reply.user.call_name }}</td>
              <td>{{ formatDateTime(reply.created_at) }}</td>
              <td>
                <v-icon
                  icon="mdi-check-circle-outline"
                  color="success"
                  v-if="!reply.is_deleted"
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
      :getItems="getReplies"
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
      replies: [],
      pagination : null,
      pageSize: 20,
      active: null,
      search: null,
      section: 'replies',
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
    this.getReplies()
  },
  methods: {
    getReplies(page=1) {
      const vm = this

      let q = ''
      if (this.search) {
        q = '&q=' + this.search
      }

      let active = ''
      if (this.active) {
        active = '&delete=' + this.delete
      }

      let url = `${this.$api('ADMIN_REPLIES').url}?page_size=${this.pageSize}&page=${page}${active}${q}`

      this.$axios({
        method: this.$api('ADMIN_REPLIES').method,
        url: url,
      })
      .then(function (response) {
        vm.pagination = response.data['pagination']
        vm.replies = response.data['data']

        vm.init = true
      })
      .catch(function (error) {
        vm.$toast.error(vm.$error(error, 'ADMIN_REPLIES'))
      })
    },
    onTabUpdate() {
      this.active = null
      this.search = null

      if (this.section == 'threads') {
        this.$router.push({
          name: 'admin.threads',
        })
      }
    },
    onEnter() {
      this.getReplies()
    },
  }
}
</script>
