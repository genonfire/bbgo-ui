<template>
  <v-container
    v-if="init"
  >
    <v-row>
      <v-col>
      </v-col>
      <v-col
        class="text-center text-h4 font-weight-bold py-2"
      >
        {{ blogOption.title }}
      </v-col>
      <v-col
        class="text-right py-2"
      >
        <v-btn
          variant="outlined"
          prepend-icon="mdi-pencil-outline"
          color="secondary"
          @click=""
          v-if="permissionWrite"
        >
          {{ $t('action.WRITE') }}
        </v-btn>
      </v-col>
    </v-row>

    <v-chip-group
      v-model="category"
      variant="text"
      class="text-secondary"
      selected-class="bg-secondary"
      mandatory
    >
      <v-row
        class="mx-8 my-2 text-center"
      >
        <v-col
          v-for="(item, index) in ['', ...blogOption.category]"
        >
          <v-chip
            :key="item"
            :text="item ? item : $t('blog.CATEGORY_ALL')"
            :value="item"
            class="px-4"
            @click="selectCategory(item)"
          ></v-chip>
        </v-col>
      </v-row>
    </v-chip-group>

    <v-container>
      <v-row
        no-glutters
      >
        <v-col
          class="pa-0"
        >
          <v-card
            v-for="(blog, index) in blogs"
            :key="blog.id"
            class="my-5 pa-0"
            variant="flat"
            hover
          >
            <v-row
              @click="$router.push({ name: 'blog.read', params: { pk: blog.id } })"
            >
              <v-col
                cols="3"
                class="px-3 py-2"
              >
                <v-img
                  :src="blog.image.file"
                  :width="smAndUp ? 240 : 120"
                  :height="smAndUp ? 240 : 120"
                ></v-img>
              </v-col>
              <v-col
                cols="9"
                class="pl-8 pr-4  py-5 font-weight-medium d-flex flex-column justify-start"
                :class="smAndUp ? 'text-h4' : 'text-h6'"
              >
                <div
                  class="text-body-1"
                >
                  <v-chip
                    variant="text"
                    color="secondary"
                    class="pl-0 text-body-1 font-weight-medium"
                  >
                    {{ blog.category }}
                  </v-chip>
                  <span
                    class="text-body-2"
                    style="color:grey;"
                  >
                    {{ formatDate(blog.created_at) }}
                  </span>
                </div>
                <div>
                  {{ blog.title }}
                </div>
                <div
                  class="mt-2 d-flex"
                >
                  <TagChips
                    :tags="blog.tags"
                    color="pale"
                    :label="true"
                  />
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <NumberPagination
      :pagination="pagination"
      :getItems="blogPage"
      :page="parseInt(page)"
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
import { useFormatDate } from '@/composables/datetime'
import { useDisplay } from 'vuetify'
import TagChips from '@/components/TagChips'

export default {
  setup() {
    const { formatDate } = useFormatDate()
    const { smAndUp } = useDisplay()
    return { formatDate, smAndUp }
  },
  components: {
    NumberPagination,
    TagChips,
  },
  data() {
    return {
      blogOption: this.$store.getBlogOption,
      blogs: [],
      pagination : null,
      pageSize: 10,
      page: 1,
      category: '',
      tag: '',
      init: false,
    }
  },
  computed: {
    permissionWrite() {
      if (this.blogOption.option.permission_write == 'staff') {
        return this.$store.isStaff
      }
      else if (this.blogOption.option.permission_write == 'member') {
        return this.$store.isApproved
      }
      else if (this.blogOption.option.permission_write == 'all') {
        return true
      }
      else {
        return false
      }
    },
  },
  mounted() {
    if (!this.blogOption) {
      this.getBlogOption()
    }

    if (this.$route.params.page) {
      this.page = this.$route.params.page
    }
    if (this.$route.query.tag) {
      this.tag = this.$route.query.tag
    }
    if (this.$route.query.category) {
      this.category = this.$route.query.category
    }
    this.getBlogs(this.page, this.$route.query.q)
  },
  methods: {
    getBlogOption() {
      const vm = this

      this.$axios({
        method: this.$api('BLOG_OPTION').method,
        url: this.$api('BLOG_OPTION').url,
      })
      .then(function (response) {
        vm.blogOption = response.data['data']
        vm.init = true
      })
      .catch(function (error) {
        vm.$toast.error(vm.$error(error, 'BLOG_OPTION'))
      })
    },
    blogPage(page=1) {
      this.$router.push({
        name: 'blogs.page',
        params: {
          page: page,
        },
        query: {
          q: this.$route.query.q,
          category: this.$route.query.category,
          tag: this.$route.query.tag,
        }
      })
    },
    getBlogs(page=1, search=null) {
      const vm = this

      let q = ''
      if (search) {
        q = '&q=' + search
      }

      let tag = ''
      if (this.tag && this.tag != '') {
        tag = '&tag=' + this.tag
      }

      let category = ''
      if (this.category && this.category != '') {
        category = '&category=' + this.category
      }

      let url = `${this.$api('BLOG_LIST').url}?page_size=${this.pageSize}&page=${page}${tag}${category}${q}`

      this.$axios({
        method: this.$api('BLOG_LIST').method,
        url: url,
      })
      .then(function (response) {
        vm.pagination = response.data['pagination']
        vm.blogs = response.data['data']

        vm.init = true
      })
      .catch(function (error) {
        vm.$toast.error(vm.$error(error, 'BLOG_LIST'))
      })
    },
    selectCategory(item) {
      if (this.category != item) {
        this.category = item
        this.$router.push({
          name: 'blogs',
          query: {
            q: this.$route.query.q,
            category: this.category,
            tag: this.$route.query.tag,
          }
        })
      }
    },
  }
}
</script>
