<template>
  <v-container
    v-if="init"
  >
    <v-row
      style="border-bottom: 1px solid #DEE1E6FF;"
    >
      <v-col
        class="py-2"
      >
      <div
        class="d-flex flex-row"
      >
        <v-btn
          icon="mdi-arrow-left"
          size="small"
          color="ashen"
          @click="backToList"
        >
        </v-btn>

        <div
          class="ml-3 text-body-2"
        >
          <div
            class="font-weight-bold"
          >
            <router-link :to="{ name: 'thread' }">
              {{ thread.forum.name }}
            </router-link>
          </div>
          <div>
            {{ getUsername(thread) }}
            <span
              class="ml-1 font-weight-regular"
            >
              - {{ formatDateTime(thread.created_at) }}
            </span>
          </div>
        </div>
      </div>
      </v-col>
      <v-col
        cols="2"
        class="text-right py-2 d-flex justify-end"
        v-if="thread.editable"
      >
        <v-tooltip
          location="bottom"
          :text="$t('action.EDIT')"
          v-if="!thread.is_deleted"
        >
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              icon="mdi-pencil-outline"
              density="comfortable"
              variant="text"
              color="secondary"
              class="ml-1"
              @click="editThread"
            >
            </v-btn>
          </template>
        </v-tooltip>
        <v-btn
          variant="outlined"
          prepend-icon="mdi-restore"
          color="secondary"
          @click="restoreThread"
          v-if="thread.is_deleted"
        >
          {{ $t('action.RESTORE_THREAD') }}
        </v-btn>
        <v-tooltip
          location="bottom"
          :text="$t('action.DELETE_THREAD')"
          v-else
        >
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              icon="mdi-trash-can-outline"
              density="comfortable"
              variant="text"
              color="pale"
              class="ml-1"
              @click="deleteDialog = true"
            >
            </v-btn>
          </template>
        </v-tooltip>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        class="mt-2 mb-5 text-h4"
        :class="thread.is_pinned ? 'font-weight-bold': ''"
      >
        <v-icon
          icon="mdi-pin-outline"
          size="x-small"
          v-if="thread.is_pinned"
        ></v-icon>
        <span
          v-if="$store.isStaff"
        >
          <a
            style="cursor: pointer;"
            @click="togglePin"
          >
            <v-tooltip
              activator="parent"
              location="bottom"
            >
              {{ $t('action.TOGGLE_PIN') }}
            </v-tooltip>
            {{ thread.title }}
          </a>
        </span>
        <span
          v-else
        >
          {{ thread.title }}
        </span>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-sheet
          class="thread-content"
          v-html="thread.content"
        >
        </v-sheet>
      </v-col>
    </v-row>
    <v-row
      class="mt-10"
      v-if="thread.files.length > 0"
    >
      <v-col>
        <v-card
          variant="plain"
          class="pb-2 px-1"
        >
          <v-card-title
            class="py-0 text-body-1"
          >
            {{ $t('forum.ATTACHMENTS') }}
          </v-card-title>
          <v-chip
            v-for="item in thread.files"
            :key="item.id"
            variant="outlined"
            class="mx-1 my-1"
            @click="downloadFile(item)"
          >
            {{ item.filename }} ({{ fileSize(item.size) }})
          </v-chip>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog
      v-model="deleteDialog"
      max-width="400"
      persistent
    >
      <v-card
        :title="$t('forum.DELETE_THREAD')"
        :text="$t('hint.DELETE_THREAD_DESCRIPTION')"
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
            @click="deleteThread()"
          >
            {{ $t('action.DELETE_THREAD') }}
          </v-btn>
        </template>
      </v-card>
    </v-dialog>

    <Reply
      class="mt-5"
      :thread="thread"
    />

  </v-container>
</template>

<script>
import { useFormatDate } from '@/composables/datetime'
import { useDownload } from '@/composables/download'
import { useFile } from '@/composables/file'
import Reply from './Reply'

export default {
  setup() {
    const { formatDateTime } = useFormatDate()
    const { fileSize } = useFile()
    return { formatDateTime, fileSize }
  },
  components: {
    Reply,
  },
  data() {
    return {
      thread: null,
      deleteDialog: false,
      init: false,
    }
  },
  mounted() {
    this.getThread(this.$route.params.forum, this.$route.params.thread)
  },
  methods: {
    backToList() {
      const back = this.$router.options.history.state.back
      if (back && back.startsWith('/forum/')) {
        this.$router.back()
      }
      else {
        this.$router.push({ name: 'thread' })
      }
    },
    getUsername(thread) {
      if (thread.user) {
        return thread.user.call_name
      }
      else {
        return thread.name
      }
    },
    getThread(forum, thread) {
      const vm = this

      this.$axios({
        method: this.$api('THREAD_READ').method,
        url: this.$api('THREAD_READ').url.replace('{forum}', forum).replace('{pk}', thread),
      })
      .then(function (response) {
        vm.thread = response.data['data']
        vm.init = true
      })
      .catch(function (error) {
        vm.$toast.error(vm.$error(error, 'THREAD_READ'))
      })
    },
    togglePin() {
      const vm = this
      let api = 'THREAD_PIN'

      if (this.thread.is_pinned) {
        api = 'THREAD_UNPIN'
      }

      this.$axios({
        method: this.$api(api).method,
        url: this.$api(api).url.replace('{forum}', this.thread.forum.name).replace('{pk}', this.thread.id),
      })
      .then(function (response) {
        vm.thread = response.data['data']

        if (vm.thread.is_pinned) {
          vm.$toast.success(vm.$t('forum.THREAD_PINNED'))
        }
        else {
          vm.$toast.success(vm.$t('forum.THREAD_UNPINNED'))
        }
      })
      .catch(function (error) {
        vm.$toast.error(vm.$error(error, api))
      })
    },
    editThread() {
      this.$router.push({
        name: 'thread.edit',
        params: {
          forum: this.$route.params.forum,
          thread: this.$route.params.thread
        }
      })
    },
    deleteThread() {
      const vm = this

      this.$axios({
        method: this.$api('THREAD_DELETE').method,
        url: this.$api('THREAD_DELETE').url.replace('{forum}', this.thread.forum.name).replace('{pk}', this.thread.id),
      })
      .then(function (response) {
        vm.deleteDialog = false
        vm.$toast.success(vm.$t('message.DELETED_SUCCESSFULLY'))
        vm.backToList()
      })
      .catch(function (error) {
        vm.$toast.error(vm.$error(error, 'THREAD_DELETE'))
      })
    },
    restoreThread() {
      const vm = this

      this.$axios({
        method: this.$api('THREAD_RESTORE').method,
        url: this.$api('THREAD_RESTORE').url.replace('{forum}', this.thread.forum.name).replace('{pk}', this.thread.id),
      })
      .then(function (response) {
        vm.deleteDialog = false
        vm.$toast.success(vm.$t('message.RESTORED_SUCCESSFULLY'))
        vm.backToList()
      })
      .catch(function (error) {
        vm.$toast.error(vm.$error(error, 'THREAD_RESTORE'))
      })
    },
    downloadFile(file) {
      useDownload('GET', file.file, file.filename)
    },
  }
}
</script>

<style lang="scss">
  .thread-content {
    white-space: break-spaces;

    img {
      max-width: 100%;
      height: auto;
    }

    table {
      border-collapse: collapse;
      table-layout: fixed;
      width: 100%;
      margin: 0;
      overflow: hidden;

      td,
      th {
        min-width: 1em;
        border: 2px solid #ced4da;
        padding: 3px 5px;
        vertical-align: top;
        box-sizing: border-box;
        position: relative;

        > * {
          margin-bottom: 0;
        }
      }

      th {
        font-weight: bold;
        text-align: left;
        background-color: #ebebeb;
        color: #000;
      }
    }
  }
</style>
