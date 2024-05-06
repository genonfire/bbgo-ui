<template>
  <v-container
    class="pa-0"
  >
    <div>
      <v-chip
        variant="flat"
        color="neutral"
        prepend-icon="mdi-message-reply-outline"
        class="px-4 mr-2"
      >
        {{ blog.comment_count }}
      </v-chip>
      <v-btn
        variant="outlined"
        prepend-icon="mdi-plus"
        color="secondary"
        class="my-5"
        @click="commenting = true"
        v-if="true"
      >
        {{ $t('blog.ADD_COMMENT') }}
      </v-btn>

      <div
        class="text-right"
        v-if="commenting"
      >
        <v-textarea
          v-model="newComment"
          rows="3"
          variant="outlined"
        >
        </v-textarea>
        <v-btn
          variant="flat"
          density="comfortable"
          color="ashen"
          class="mr-2"
          @click="cancelComment(-1)"
        >
          {{ $t('action.CANCEL') }}
        </v-btn>
        <v-btn
          variant="flat"
          density="comfortable"
          color="secondary"
          @click="saveComment(-1, 0)"
          :disabled="!newComment"
        >
          {{ $t('action.SAVE') }}
        </v-btn>
      </div>
    </div>

    <v-card
      variant="flat"
      v-for="(comment, index) in comments"
      :key="comment.id"
      :id="'comment-' + comment.id"
      :class="comment.comment_id ? 'ml-5': ''"
      :disabled="comment.is_deleted"
    >
      <v-card-text
        class="pb-2"
      >
        <v-chip
          variant="flat"
          density="compact"
          color="secondary"
          class="mr-2 px-2"
          v-if="comment.user && (comment.user.id == blog.user.id)"
        >
          {{ $t('blog.AUTHOR') }}
        </v-chip>
        <span
          class="font-weight-bold"
        >
          {{ username(comment) }}
        </span>
        <span
          style="color: #565E6C"
        >
          - {{ formatDateOrTime(comment.date_or_time) }}
        </span>
      </v-card-text>
      <v-card-text
        class="py-1"
        v-if="!comment.is_deleted"
      >
        {{ comment.content }}

        <v-card-actions
          class="pl-0 d-flex"
        >
          <v-btn
            variant="text"
            prepend-icon="mdi-message-reply-outline"
            @click="replying[index] = true"
          >
            {{ $t('blog.REPLY') }}
          </v-btn>
          <v-btn
            variant="text"
            prepend-icon="mdi-trash-can-outline"
            color="secondary"
            @click="deleteComment(comment.id)"
            v-if="comment.editable"
          >
            {{ $t('action.DELETE') }}
          </v-btn>
        </v-card-actions>

        <div
          class="text-right"
          v-if="replying[index]"
        >
          <v-textarea
            v-model="textareas[index]"
            rows="3"
            variant="outlined"
          >
          </v-textarea>
          <v-btn
            variant="flat"
            density="comfortable"
            color="ashen"
            class="mr-2"
            @click="cancelComment(index)"
          >
            {{ $t('action.CANCEL') }}
          </v-btn>
          <v-btn
            variant="flat"
            density="comfortable"
            color="secondary"
            @click="saveComment(index, comment.id)"
            :disabled="!textareas[index]"
          >
            {{ $t('action.SAVE') }}
          </v-btn>
        </div>
      </v-card-text>
      <v-card-text
        class="py-1"
        v-else
      >
        {{ $t('blog.DELETED_COMMENT') }}
      </v-card-text>
    </v-card>

    <div v-if="loading">
      <v-progress-linear
        indeterminate
        :height="1"
        color="secondary"
      ></v-progress-linear>
    </div>

    <Observer
      @show="getMoreComments"
    />

  </v-container>
</template>

<script>
import Observer from '@/components/Observer'
import { useFormatDate } from '@/composables/datetime'
import { useUser } from '@/composables/user'

export default {
  props: {
    blog: Object
  },
  setup() {
    const { formatDateOrTime } = useFormatDate()
    const { username } = useUser()
    return { formatDateOrTime, username }
  },
  components: {
    Observer
  },
  data() {
    return {
      comments: null,
      dataStored: [],
      nextLink: null,
      pageSize: 50,
      init: false,
      loading: false,
      newComment: null,
      commenting: false,
      textareas: [],
      replying: [],
      scrollTo: null,
    }
  },
  mounted() {
    this.getComments()

    if (this.$route.params.comment) {
      this.scrollTo = 'comment-' + this.$route.params.comment
    }
  },
  methods: {
    scrollToComment() {
      const targetSection = document.getElementById(this.scrollTo);

      if (targetSection) {
        targetSection.scrollIntoView(
          {
            behavior: 'smooth',
            block: 'start',
          }
        )
      }

      this.scrollTo = null
    },
    getComments() {
      const vm = this
      const url = `${this.$api('BLOG_COMMENTS').url.replace('{pk}', this.blog.id)}?page_size=${this.pageSize}`

      this.$axios({
        method: this.$api('BLOG_COMMENTS').method,
        url: url,
      })
      .then(function (response) {
        vm.nextLink = response.data['pagination']['next_link']
        vm.comments = response.data['data']
        vm.replying = new Array(vm.comments.length).fill(false)
        vm.textareas = new Array(vm.comments.length).fill(null)
        vm.commenting = false
        vm.newComment = null
        vm.init = true

        if (vm.scrollTo) {
          setTimeout(
            vm.scrollToComment,
            300,
          )
        }
      })
      .catch(function (error) {
        vm.$toast.error(vm.$error(error, 'BLOG_COMMENTS'))
      })
    },
    updateData() {
      this.comments = [...this.comments, ...this.dataStored]
      this.replying = new Array(this.comments.length).fill(false)
      this.textareas = new Array(this.comments.length).fill(null)
      this.commenting = false
      this.newComment = null
      this.loading = false
    },
    getMoreComments() {
      if (!this.nextLink) {
        return
      }

      const vm = this

      this.loading = true

      this.$axios({
        method: this.$api('BLOG_COMMENTS').method,
        url: this.nextLink,
      })
      .then(function (response) {
        vm.nextLink = response.data['pagination']['next_link']
        vm.dataStored = response.data['data']

        setTimeout(
          vm.updateData,
          1000,
        )
      })
      .catch(function (error) {
        vm.$toast.error(vm.$error(error, 'BLOG_COMMENTS'))
      })
    },
    cancelComment(index) {
      if (index == -1) {
        this.commenting = false
        this.newComment = null
      }
      else {
        this.replying[index] = false
        this.textareas[index] = null
      }
    },
    saveComment(index, commentId) {
      const vm = this

      let data = {
        comment_id: commentId,
        content: this.textareas[index]
      }

      if (index == -1) {
        data = {
          content: this.newComment
        }
      }

      this.$axios({
        method: this.$api('BLOG_COMMENT').method,
        url: this.$api('BLOG_COMMENT').url.replace('{pk}', this.blog.id),
        data: data
      })
      .then(function (response) {
        vm.getComments()
      })
      .catch(function (error) {
        vm.$toast.error(vm.$error(error, 'BLOG_COMMENT'))
      })
    },
    deleteComment(commentId) {
      const vm = this

      if (confirm(this.$t('blog.DELETE_COMMENT'))) {
        this.$axios({
          method: this.$api('DELETE_COMMENT').method,
          url: this.$api('DELETE_COMMENT').url.replace('{pk}', commentId),
        })
        .then(function (response) {
          vm.getComments()
          vm.$toast.success(vm.$t('message.DELETED_SUCCESSFULLY'))
        })
        .catch(function (error) {
          vm.$toast.error(vm.$error(error, 'DELETE_COMMENT'))
        })
      }
    },
  }
}
</script>

<style scoped>
  .reply-content {
    white-space: break-spaces;
  }
</style>
