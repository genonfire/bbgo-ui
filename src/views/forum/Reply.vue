<template>
  <v-container
    class="pa-0"
  >
    <div>
      <v-chip
        variant="tonal"
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
        @click="writeReply(0)"
        v-if="thread.forum.permissions.reply"
      >
        {{ $t('forum.ADD_COMMENT') }}
      </v-btn>
    </div>

    <v-card
      variant="flat"
      v-for="reply in replies"
      :key="reply.id"
      :class="reply.reply_id ? 'ml-5': ''"
      :disabled="reply.is_deleted"
    >
      <v-card-text
        class="pb-1"
      >
        <v-chip
          variant="flat"
          density="comfortable"
          color="secondary"
          class="mr-2"
          v-if="reply.user.id == thread.user.id"
        >
          {{ $t('forum.AUTHOR') }}
        </v-chip>
        <span
          class="font-weight-bold"
        >
          {{ reply.user.call_name }}
        </span>
        <span
          style="color: #565E6C"
        >
          - {{ formatDateOrTime(reply.date_or_time) }}
        </span>
      </v-card-text>
      <v-card-text
        class="py-2"
        v-if="!reply.is_deleted"
      >
        {{ reply.content }}
        <v-card-actions
          class="pl-0 d-flex"
        >
          <v-btn
            variant="text"
            prepend-icon="mdi-message-reply-outline"
            @click="writeReply(reply.id)"
          >
            {{ $t('forum.REPLY') }}
          </v-btn>
          <v-btn
            variant="text"
            prepend-icon="mdi-pencil-outline"
            @click="editReply(reply.id)"
            v-if="reply.editable"
          >
            {{ $t('action.EDIT') }}
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
      </v-card-text>
      <v-card-text
        class="py-2"
        v-else
      >
        {{ $t('forum.DELETED_COMMENT') }}
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { useFormatDate } from '@/composables/datetime'

export default {
  props: {
    thread: Object
  },
  setup() {
    const { formatDateOrTime } = useFormatDate()
    return { formatDateOrTime }
  },
  data() {
    return {
      replies: null,
      pageSize: 50,
      init: false,
      replyDialog: false,
      replyId: 0,
    }
  },
  mounted() {
    this.getReplies()
  },
  methods: {
    getReplies() {
      const vm = this
      const url = `${this.$api('THREAD_REPLIES').url.replace('{pk}', this.thread.id)}?page_size=${this.pageSize}`

      this.$axios({
        method: this.$api('THREAD_REPLIES').method,
        url: url,
      })
      .then(function (response) {
        vm.replies = response.data['data']
        vm.init = true
      })
      .catch(function (error) {
        vm.$toast.error(vm.$error(error, 'THREAD_REPLIES'))
      })
    },
    writeReply(replyId) {
      this.replyId = replyId
      this.replyDialog = true
    },
    saveReply() {
    },
    editReply(replyId) {
    },
    deleteReply(replyId) {
    },
  }
}
</script>

<style scoped>
  .reply-content {
    white-space: break-spaces;
  }
</style>
