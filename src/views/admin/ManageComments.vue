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
        {{ $t('blog.COMMENTS') }}
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
          <v-tab value="blogs">{{ $t('blog.BLOGS') }}</v-tab>
          <v-tab value="comments">{{ $t('blog.COMMENTS') }}</v-tab>
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
          :getItems="getComments"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-table
          density="comfortable"
        >
          <thead>
            <tr>
              <th>{{ $t('common.ID') }}</th>
              <th>{{ $t('blog.REPLY_USER') }}</th>
              <th>{{ $t('blog.REPLY_CONTENT') }}</th>
              <th>{{ $t('blog.REPLY_BLOG') }}</th>
              <th>{{ $t('common.DATE_CREATED') }}</th>
              <th>{{ $t('common.ACTIVE') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="comment in comments"
              :key="comment.id"
              :style="comment.is_deleted ? { opacity: 0.5 } : ''"
            >
              <td>{{ comment.id }}</td>
              <td>{{ username(comment) }}</td>
              <td>
                <router-link
                  :to="{
                    name: 'blog.comment',
                    params: {
                      blog: comment.blog.id,
                      comment: comment.id,
                      title: comment.blog.title.replace(/ /g, '_')
                    }
                  }"
                >
                  {{ comment.content }}
                </router-link>
              </td>
              <td>
                <router-link
                  :to="{
                    name: 'blog.read',
                    params: {
                      blog: comment.blog.id,
                      title: comment.blog.title.replace(/ /g, '_')
                    }
                  }"
                >
                  {{ comment.blog.title }}
                </router-link>
              </td>
              <td>{{ formatDateTime(comment.created_at) }}</td>
              <td>
                <v-icon
                  icon="mdi-check-circle-outline"
                  color="success"
                  v-if="!comment.is_deleted"
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
      :getItems="getComments"
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
import { useUser } from '@/composables/user'

export default {
  setup() {
    const { formatDateTime } = useFormatDate()
    const { username } = useUser()
    return { formatDateTime, username }
  },
  components: {
    NumberPagination,
    ActiveSelector,
  },
  data() {
    return {
      comments: [],
      pagination : null,
      pageSize: 20,
      active: null,
      search: null,
      section: 'comments',
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
    this.getComments()
  },
  methods: {
    getComments(page=1) {
      const vm = this

      let q = ''
      if (this.search) {
        q = '&q=' + this.search
      }

      let active = ''
      if (this.active) {
        active = '&delete=' + this.delete
      }

      let url = `${this.$api('ADMIN_COMMENTS').url}?page_size=${this.pageSize}&page=${page}${active}${q}`

      this.$axios({
        method: this.$api('ADMIN_COMMENTS').method,
        url: url,
      })
      .then(function (response) {
        vm.pagination = response.data['pagination']
        vm.comments = response.data['data']

        vm.init = true
      })
      .catch(function (error) {
        vm.$toast.error(vm.$error(error, 'ADMIN_COMMENTS'))
      })
    },
    onUpdateCategory() {
      this.getComments()
    },
    onEnter() {
      this.getComments()
    },
    onTabUpdate() {
      this.active = null
      this.search = null

      if (this.section == 'blogs') {
        this.$router.push({
          name: 'admin.blogs',
        })
      }
    },
  }
}
</script>
