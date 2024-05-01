<template>
  <v-container
    v-if="init"
  >
    <v-row
    >
      <v-col
        class="my-4 d-flex flex-column"
      >
        <div
          class="mb-1 text-secondary"
        >
          {{ blog.category }}
        </div>
        <div
          class="text-h4 font-weight-medium"
        >
          {{ blog.title }}
        </div>
        <div
          class="my-3 text-body-2"
        >
          <span
            class="mx-2 "
          >
            By
            <span
              class="font-italic text-decoration-underline"
            >
              {{ blog.user.call_name }}
            </span>
          </span>
          <span
            class="ml-2 text-pale"
          >
            {{ formatDate(blog.created_at) }}
          </span>
        </div>
      </v-col>
    </v-row>
    <v-row
      class="my-0"
    >
      <v-col>
        <img
          :src="blog.image.file"
          width="320"
          style="max-width: 100%;"
          v-if="blog.image"
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-sheet
          class="editor-content"
          v-html="blog.content"
        >
        </v-sheet>
      </v-col>
    </v-row>
    <v-row
      class="my-8"
    >
      <v-col>
        <TagChips
          :tags="blog.tags"
          :label="true"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        class="text-center"
      >
        <v-btn
          variant="flat"
          prepend-icon="mdi-thumb-up-outline"
          :color="liked ? 'secondary' : 'neutral'"
          @click="likeBlog"
        >
          {{ like }}
        </v-btn>
        <v-btn
          variant="flat"
          color="neutral"
          class="mx-2"
          @click="$router.push({ name: 'blog.edit', params: { blog: blog.id} })"
          v-if="blog.editable"
        >
          {{ $t('action.EDIT') }}
        </v-btn>
        <v-btn
          variant="flat"
          color="secondary"
          @click="deleteDialog = true"
          v-if="blog.editable"
        >
          {{ $t('action.DELETE') }}
        </v-btn>
      </v-col>
    </v-row>

    <v-dialog
      v-model="deleteDialog"
      max-width="400"
      persistent
    >
      <v-card
        :title="$t('blog.DELETE_BLOG')"
        :text="$t('hint.DELETE_BLOG_DESCRIPTION')"
      >
        <template v-slot:prepend>
          <v-icon
            icon="mdi-alert"
            color="secondary"
          ></v-icon>
        </template>
        <template v-slot:actions>
          <v-spacer></v-spacer>

          <v-btn
            variant="outlined"
            color="pale"
            @click="deleteDialog = false"
          >
            {{ $t('action.CANCEL') }}
          </v-btn>

          <v-btn
            color="secondary"
            @click="deleteBlog()"
          >
            {{ $t('action.DELETE_BLOG') }}
          </v-btn>
        </template>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script>
import { useFormatDate } from '@/composables/datetime'
import TagChips from '@/components/TagChips'

export default {
  setup() {
    const { formatDate } = useFormatDate()
    return { formatDate }
  },
  components: {
    TagChips,
  },
  data() {
    return {
      blog: null,
      like: 0,
      liked: false,
      deleteDialog: false,
      init: false,
    }
  },
  mounted() {
    this.getBlog(this.$route.params.blog)
  },
  methods: {
    getBlog(blog) {
      const vm = this

      this.$axios({
        method: this.$api('READ_BLOG').method,
        url: this.$api('READ_BLOG').url.replace('{pk}', blog),
      })
      .then(function (response) {
        vm.blog = response.data['data']
        vm.like = vm.blog.like
        vm.liked = vm.blog.liked
        vm.init = true
      })
      .catch(function (error) {
        vm.$toast.error(vm.$error(error, 'READ_BLOG'))
      })
    },
    likeBlog() {
      if (this.liked) {
        this.$toast.info(this.$t('error.ALREADY_LIKED'))
        return
      }

      const vm = this

      this.$axios({
        method: this.$api('LIKE_BLOG').method,
        url: this.$api('LIKE_BLOG').url.replace('{pk}', this.blog.id),
      })
      .then(function (response) {
        vm.like = response.data['data']['like']
        vm.liked = true
        vm.$toast.success(vm.$t('message.LIKED_SUCCESSFULLY'))
      })
      .catch(function (error) {
        vm.$toast.error(vm.$error(error, 'LIKE_BLOG'))
      })
    },
    deleteBlog() {
      const vm = this

      this.$axios({
        method: this.$api('DELETE_BLOG').method,
        url: this.$api('DELETE_BLOG').url.replace('{pk}', this.blog.id),
      })
      .then(function (response) {
        vm.deleteDialog = false
        vm.$router.replace({ name: 'blogs' })
        vm.$toast.success(vm.$t('message.DELETED_SUCCESSFULLY'))
      })
      .catch(function (error) {
        vm.$toast.error(vm.$error(error, 'DELETE_BLOG'))
      })
    },
  }
}
</script>

<style lang="scss">
  @import "@/styles/contents";
</style>
