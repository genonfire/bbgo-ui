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
          @click="getBlogOption"
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
          :placeholder="$t('hint.SEARCH_TITLE_CONTENTS_TAGS')"
          @keydown.enter="onEnter"
        >
        </v-text-field>
      </v-col>
      <v-col
        cols="2"
        class="ml-1 pl-0 pr-3 hidden-sm-and-down"
      >
        <v-select
          v-model="category"
          clearable
          variant="outlined"
          density="compact"
          :label="$t('blog.CATEGORY')"
          :items="categoryItems"
          @update:modelValue="onUpdateCategory"
        >
        </v-select>
      </v-col>
      <v-col
        cols="2"
        class="ml-1 pl-0 pr-3 hidden-sm-and-down"
      >
        <ActiveSelector
          v-model="active"
          :getItems="getBlogs"
          :label="$t('blog.PUBLISHED')"
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
              <th>{{ $t('blog.TITLE') }}</th>
              <th>{{ $t('blog.CATEGORY') }}</th>
              <th>{{ $t('blog.TAGS') }}</th>
              <th>{{ $t('blog.LIKES') }}</th>
              <th>{{ $t('blog.DATE_PUBLISHED') }}</th>
              <th>{{ $t('blog.PUBLISHED') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="blog in blogs"
              :key="blog.id"
              :style="blog.is_published ? '' : { opacity: 0.5 }"
            >
              <td>{{ blog.id }}</td>
              <td>
                <router-link
                  :to="{
                    name: 'blog.read',
                    params: {
                      blog: blog.id,
                      title: blog.title.replace(/ /g, '_')
                    }
                  }"
                >
                  {{ blog.title }}
                </router-link>
              </td>
              <td>{{ blog.category }}</td>
              <td>
                <TagChips
                  :tags="blog.tags"
                />
              </td>
              <td>{{ blog.like }}</td>
              <td>{{ formatDateTime(blog.created_at) }}</td>
              <td>
                <v-icon
                  icon="mdi-check-circle-outline"
                  color="success"
                  v-if="blog.is_published"
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
      :getItems="getBlogs"
    />

    <v-dialog
      v-model="dialog"
      max-width="500"
    >
      <v-card
        width="100%"
        class="mx-auto mt-3 pa-6 pt-2"
      >
        <v-card-title
          class="mb-4 text-h6 font-weight-bold text-center"
        >
          {{ $t('blog.BLOG_OPTION') }}
        </v-card-title>

        <v-form>
          <v-row>
            <v-col>
              <div class="text-body-2 font-weight-medium">
                {{ $t('blog.TITLE') }}
              </div>
              <v-text-field
                v-model="blogOption.title"
                density="compact"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row
            class="my-0"
          >
            <v-col>
              <div class="text-body-2 font-weight-medium">
                {{ $t('blog.DESCRIPTION') }}
              </div>
              <v-text-field
                v-model="blogOption.description"
                density="compact"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row
            class="my-0"
          >
            <v-col>
              <div class="text-body-2 font-weight-medium">
                {{ $t('blog.CATEGORY') }}
              </div>
              <v-combobox
                v-model="blogOption.category"
                density="comfortable"
                multiple
                chips
                closable-chips
                hide-details
                :placeholder="$t('hint.HIT_ENTER_FOR_MULTIPLE')"
              ></v-combobox>
            </v-col>
          </v-row>

          <v-list
            density="compact"
            class="py-0"
          >
            <v-list-subheader>
              {{ $t('blog.OPTIONS') }}
            </v-list-subheader>

            <v-list-item
              class="py-0"
            >
              <v-select
                v-model="blogOption.option.permission_list"
                :label="$t('blog.PERMISSION_LIST')"
                :items="permissions"
                density="comfortable"
              ></v-select>
            </v-list-item>
            <v-list-item
              class="py-0"
            >
              <v-select
                v-model="blogOption.option.permission_read"
                :label="$t('blog.PERMISSION_READ')"
                :items="permissions"
                density="comfortable"
              ></v-select>
            </v-list-item>
            <v-list-item
              class="py-0"
            >
              <v-select
                v-model="blogOption.option.permission_write"
                :label="$t('blog.PERMISSION_WRITE')"
                :items="permissions"
                density="comfortable"
              ></v-select>
            </v-list-item>
            <v-list-item
              class="py-0"
            >
              <v-select
                v-model="blogOption.option.permission_reply"
                :label="$t('blog.PERMISSION_REPLY')"
                :items="permissions"
                density="comfortable"
              ></v-select>
            </v-list-item>
            <v-list-item
              class="py-0"
            >
              <v-select
                v-model="blogOption.option.permission_vote"
                :label="$t('blog.PERMISSION_VOTE')"
                :items="permissions"
                density="comfortable"
              ></v-select>
            </v-list-item>
          </v-list>

          <v-card-actions
            class="my-0 pa-0"
          >
            <v-btn
              color="secondary"
              block
              @click="editBlogOption"
            >
              {{ $t('action.SAVE') }}
            </v-btn>
          </v-card-actions>
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
import TagChips from '@/components/TagChips'
import { useFormatDate } from '@/composables/datetime'

export default {
  setup() {
    const { formatDateTime } = useFormatDate()
    return { formatDateTime }
  },
  components: {
    NumberPagination,
    ActiveSelector,
    TagChips,
  },
  data() {
    return {
      blogOption: null,
      blogs: [],
      pagination : null,
      pageSize: 20,
      active: null,
      search: null,
      category: null,
      categoryItems: null,
      section: 'blogs',
      dialog: false,
      init: false,
    }
  },
  computed: {
    permissions() {
      return ['all', 'member', 'staff']
    },
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
    getBlogOption() {
      const vm = this

      this.$axios({
        method: this.$api('BLOG_OPTION').method,
        url: this.$api('BLOG_OPTION').url,
      })
      .then(function (response) {
        vm.blogOption = response.data['data']
        vm.dialog = true
      })
      .catch(function (error) {
        vm.$toast.error(vm.$error(error, 'BLOG_OPTION'))
      })
    },
    editBlogOption() {
      const vm = this

      this.$axios({
        method: this.$api('EDIT_BLOG_OPTION').method,
        url: this.$api('EDIT_BLOG_OPTION').url,
        data: this.blogOption,
      })
      .then(function (response) {
        vm.$toast.success(vm.$t('message.SAVED_SUCCESSFULLY'))
        vm.dialog = false
      })
      .catch(function (error) {
        vm.$toast.error(vm.$error(error, 'EDIT_BLOG_OPTION'))
      })
    },
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

      let category = ''
      if (this.category) {
        category = '&category=' + this.category
      }

      let url = `${this.$api('ADMIN_BLOGS').url}?page_size=${this.pageSize}&page=${page}${active}${category}${q}`

      this.$axios({
        method: this.$api('ADMIN_BLOGS').method,
        url: url,
      })
      .then(function (response) {
        vm.pagination = response.data['pagination']
        vm.blogs = response.data['data']
        if (response.data['filter']) {
          vm.categoryItems = response.data['filter']['category']
        }

        vm.init = true
      })
      .catch(function (error) {
        vm.$toast.error(vm.$error(error, 'ADMIN_BLOGS'))
      })
    },
    onUpdateCategory() {
      this.getBlogs()
    },
    onEnter() {
      this.getBlogs()
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
  }
}
</script>
