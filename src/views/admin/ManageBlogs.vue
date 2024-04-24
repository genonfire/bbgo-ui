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
        {{ $t('blog.BLOGS') }}
      </v-col>
      <v-col
        class="text-right py-2"
      >
        <v-btn
          variant="outlined"
          prepend-icon="mdi-pencil-outline"
          color="secondary"
          @click=""
        >
          {{ $t('blog.BLOG_OPTION') }}
        </v-btn>
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
          :placeholder="$t('hint.SEARCH_TITLE_CONTENTS_TAG')"
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
          :getItems="getBlogs"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
      </v-col>
    </v-row>

    <NumberPagination
      v-model="pageSize"
      :pagination="pagination"
      :getItems="getBlogs"
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
      blogs: [],
      pagination : null,
      pageSize: 20,
      active: null,
      search: null,
      section: 'blogs',
      init: false,
    }
  },
  computed: {
    draft() {
      if (this.active == 'false') {
        return true
      }
      else {
        return false
      }
    },
  },
  mounted() {
    this.getBlogs()
  },
  methods: {
    getBlogs(page=1) {
      const vm = this

      let q = ''
      if (this.search) {
        q = '&q=' + this.search
      }

      let active = ''
      if (this.active) {
        active = '&draft=' + this.draft
      }

      let url = `${this.$api('ADMIN_BLOGS').url}?page_size=${this.pageSize}&page=${page}${active}${q}`

      this.$axios({
        method: this.$api('ADMIN_BLOGS').method,
        url: url,
      })
      .then(function (response) {
        vm.pagination = response.data['pagination']
        vm.blogs = response.data['data']

        vm.init = true
      })
      .catch(function (error) {
        vm.$toast.error(vm.$error(error, 'ADMIN_BLOGS'))
      })
    },
    onTabUpdate() {
      this.active = null
      this.search = null

      if (this.section == 'comments') {
        this.$router.push({
          name: 'admin.comments',
        })
      }
    },
    onEnter() {
      this.getBlogs()
    },
    goBlog(blog) {
    },
  }
}
</script>
