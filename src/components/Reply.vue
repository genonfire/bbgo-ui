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
        {{ thread.reply_count }}
      </v-chip>
      <v-btn
        variant="outlined"
        prepend-icon="mdi-plus"
        color="secondary"
        class="my-5"
        @click="commenting = true"
        v-if="thread.forum.permissions.reply"
      >
        {{ $t('forum.ADD_COMMENT') }}
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
          @click="cancelReply(-1)"
        >
          {{ $t('action.CANCEL') }}
        </v-btn>
        <v-btn
          variant="flat"
          density="comfortable"
          color="secondary"
          @click="saveReply(-1, 0)"
          :disabled="!newComment"
        >
          {{ $t('action.SAVE') }}
        </v-btn>
      </div>
    </div>

    <v-card
      variant="flat"
      v-for="(reply, index) in replies"
      :key="reply.id"
      :id="'reply-' + reply.id"
      :class="reply.reply_id ? 'ml-5': ''"
      :disabled="reply.is_deleted"
    >
      <v-card-text
        class="pb-2"
      >
        <v-chip
          variant="flat"
          density="compact"
          color="secondary"
          class="mr-2 px-2"
          v-if="reply.user && (reply.user.id == thread.user.id)"
        >
          {{ $t('forum.AUTHOR') }}
        </v-chip>
        <span
          class="font-weight-bold"
        >
          {{ username(reply) }}
        </span>
        <span
          style="color: #565E6C"
        >
          - {{ formatDateOrTime(reply.date_or_time) }}
        </span>
      </v-card-text>
      <v-card-text
        class="py-1"
        v-if="!reply.is_deleted"
      >
        {{ reply.content }}

        <v-card-actions
          class="pl-0 d-flex"
        >
          <v-btn
            variant="text"
            prepend-icon="mdi-message-reply-outline"
            @click="replying[index] = true"
            v-if="thread.forum.permissions.reply"
          >
            {{ $t('forum.REPLY') }}
          </v-btn>
          <v-btn
            variant="text"
            prepend-icon="mdi-trash-can-outline"
            color="secondary"
            @click="deleteReply(reply.id)"
            v-if="reply.editable"
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
            @click="cancelReply(index)"
          >
            {{ $t('action.CANCEL') }}
          </v-btn>
          <v-btn
            variant="flat"
            density="comfortable"
            color="secondary"
            @click="saveReply(index, reply.id)"
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
        {{ $t('forum.DELETED_COMMENT') }}
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
      @show="getMoreReplies"
    />

  </v-container>
</template>

<script>
import Observer from '@/components/Observer'
import { useFormatDate } from '@/composables/datetime'
import { useUser } from '@/composables/user'

export default {
  props: {
    thread: Object
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
      replies: null,
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
    this.getReplies()

    if (this.$route.params.reply) {
      this.scrollTo = 'reply-' + this.$route.params.reply
    }
  },
  methods: {
    scrollToReply() {
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
    getReplies() {
      const vm = this
      const url = `${this.$api('THREAD_REPLIES').url.replace('{pk}', this.thread.id)}?page_size=${this.pageSize}`

      this.$axios({
        method: this.$api('THREAD_REPLIES').method,
        url: url,
      })
      .then(function (response) {
        vm.nextLink = response.data['pagination']['next_link']
        vm.replies = response.data['data']
        vm.replying = new Array(vm.replies.length).fill(false)
        vm.textareas = new Array(vm.replies.length).fill(null)
        vm.commenting = false
        vm.newComment = null
        vm.init = true

        if (vm.scrollTo) {
          setTimeout(
            vm.scrollToReply,
            300,
          )
        }
      })
      .catch(function (error) {
        vm.$toast.error(vm.$error(error, 'THREAD_REPLIES'))
      })
    },
    updateData() {
      this.replies = [...this.replies, ...this.dataStored]
      this.replying = new Array(this.replies.length).fill(false)
      this.textareas = new Array(this.replies.length).fill(null)
      this.commenting = false
      this.newComment = null
      this.loading = false
    },
    getMoreReplies() {
      if (!this.nextLink) {
        return
      }

      const vm = this

      this.loading = true

      this.$axios({
        method: this.$api('THREAD_REPLIES').method,
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
        vm.$toast.error(vm.$error(error, 'THREAD_REPLIES'))
      })
    },
    cancelReply(index) {
      if (index == -1) {
        this.commenting = false
        this.newComment = null
      }
      else {
        this.replying[index] = false
        this.textareas[index] = null
      }
    },
    saveReply(index, replyId) {
      const vm = this

      let data = {
        reply_id: replyId,
        content: this.textareas[index]
      }

      if (index == -1) {
        data = {
          content: this.newComment
        }
      }

      this.$axios({
        method: this.$api('THREAD_REPLY').method,
        url: this.$api('THREAD_REPLY').url.replace('{pk}', this.thread.id),
        data: data
      })
      .then(function (response) {
        vm.getReplies()
      })
      .catch(function (error) {
        vm.$toast.error(vm.$error(error, 'THREAD_REPLY'))
      })
    },
    deleteReply(replyId) {
      const vm = this

      if (confirm(this.$t('forum.DELETE_REPLY'))) {
        this.$axios({
          method: this.$api('REPLY_DELETE').method,
          url: this.$api('REPLY_DELETE').url.replace('{pk}', replyId),
        })
        .then(function (response) {
          vm.getReplies()
          vm.$toast.success(vm.$t('message.DELETED_SUCCESSFULLY'))
        })
        .catch(function (error) {
          vm.$toast.error(vm.$error(error, 'REPLY_DELETE'))
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
