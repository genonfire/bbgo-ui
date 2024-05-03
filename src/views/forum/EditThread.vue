<template>
  <v-container
    v-if="init"
  >
    <v-row
      class="mt-0"
    >
      <v-col
      >
        <v-text-field
          v-model="thread.title"
          variant="outlined"
          density="compact"
          :placeholder="$t('forum.THREAD_TITLE')"
        >
        </v-text-field>
      </v-col>
    </v-row>
    <v-row
      class="mt-0"
    >
      <v-col>
        <Tiptap
          :options="options"
        />
      </v-col>
    </v-row>
    <v-row
      v-if="thread.forum.support_files"
    >
      <v-col>
        <v-card
          :title="$t('forum.ATTACHMENTS')"
          variant="outlined"
          density="compact"
          class="rounded-lg border-dashed"
        >
          <div
            class="pl-2"
            v-if="thread.files"
          >
            <v-chip
              v-for="item in fileChips"
              :key="item.id"
              variant="tonal"
              class="mx-1 my-1"
              closable
              @click:close="removeItem(item)"
              @update:modelValue="true"
            >
              {{ item.filename }} ({{ fileSize(item.size) }})
            </v-chip>
          </div>
          <v-card
            variant="outlined"
            density="compact"
            :color="isHovering ? 'secondary' : undefined"
            class="ma-2 pa-3 rounded-lg border-dashed text-center"
            v-on:drop="handleFileDrop"
            v-on:dragover="allowDrop"
            v-on:dragleave="leaveDrop"
          >
            <v-icon
              size="x-large"
              :color="isHovering? 'secondary': 'pale'"
            >
              mdi-cloud-upload-outline
            </v-icon>
            <v-card-text
              class="mt-2 pa-1"
            >
              {{ $t('hint.DROP_FILES_HERE') }}
            </v-card-text>
          </v-card>
        </v-card>
      </v-col>
    </v-row>
    <v-row
      class="my-10"
    >
      <v-col
        class="text-right"
      >
        <v-btn
          variant="flat"
          color="secondary"
          class="px-8"
          @click="save"
          :disabled="!thread.title || !options.content"
        >
          {{ $t('action.SAVE') }}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Tiptap from '@/components/Tiptap'
import { useFile } from '@/composables/file'

export default {
  setup() {
    const { fileSize } = useFile()
    return { fileSize }
  },
  components: {
    Tiptap,
  },
  data() {
    return {
      thread: null,
      options: {
        content: '',
      },
      fileChips: [],
      isHovering: false,
      saved: false,
      init: false,
    }
  },
  mounted() {
    this.getThread(this.$route.params.forum, this.$route.params.thread)
  },
  beforeRouteLeave(to, from, next) {
    if (this.saved || confirm(this.$t('forum.QUIT_EDITING'))) {
      next()
    }
    else {
      next(false)
    }
  },
  methods: {
    getThread(forum, thread) {
      const vm = this

      this.$axios({
        method: this.$api('THREAD_READ').method,
        url: this.$api('THREAD_READ').url.replace('{forum}', forum).replace('{pk}', thread),
      })
      .then(function (response) {
        vm.thread = response.data['data']
        vm.options.content = vm.thread.content
        vm.fileChips = vm.thread.files
        vm.init = true
      })
      .catch(function (error) {
        vm.$toast.error(vm.$error(error, 'THREAD_READ'))
      })
    },
    save() {
      const vm = this

      this.$axios({
        method: this.$api('THREAD_EDIT').method,
        url: this.$api('THREAD_EDIT').url.replace('{forum}', this.thread.forum.name).replace('{pk}', this.thread.id),
        data: {
          title: this.thread.title,
          content: this.options.content,
        }
      })
      .then(function (response) {
        vm.saved = true
        vm.$toast.success(vm.$t('message.SAVED_SUCCESSFULLY'))
        vm.$router.back()
      })
      .catch(function (error) {
        vm.$toast.error(vm.$error(error, 'THREAD_EDIT'))
      })
    },
    allowDrop(event) {
      event.preventDefault()
      this.isHovering = true
    },
    leaveDrop(event) {
      event.preventDefault()
      this.isHovering = false
    },
    handleFileDrop(event) {
      const vm = this
      this.isHovering = false

      if (this.thread.forum.support_files) {
        event.preventDefault()

        for (let i=0; i<event.dataTransfer.files.length; i++) {
          let formData = new FormData()
          formData.append('file', event.dataTransfer.files[i])

          this.$axios({
            method: this.$api('FILE_UPLOAD').method,
            url: this.$api('FILE_UPLOAD').url,
            data: formData,
          })
          .then(function (response) {
            vm.thread.files.push(response.data['data'])

            vm.$axios({
              method: vm.$api('THREAD_ATTACH_FILES').method,
              url: vm.$api('THREAD_ATTACH_FILES').url.replace('{forum}', vm.thread.forum.name).replace('{pk}', vm.thread.id),
              data: {
                files: [
                  {
                    id: response.data['data']['id']
                  }
                ]
              }
            })
            .then(function (response) {
            })
            .catch(function (error) {
              vm.$toast.error(vm.$error(error, 'THREAD_ATTACH_FILES'))
            })
          })
          .catch(function (error) {
            vm.$toast.error(vm.$error(error, 'FILE_UPLOAD'))
          })
        }
      }
    },
    removeItem(item) {
      const vm = this

      this.$axios({
        method: this.$api('THREAD_DELETE_FILES').method,
        url: this.$api('THREAD_DELETE_FILES').url.replace('{forum}', this.thread.forum.name).replace('{pk}', this.thread.id),
        data: {
          files: [
            {
              id: item.id
            }
          ]
        }
      })
      .then(function (response) {
        vm.saved = true
        vm.$toast.success(vm.$t('message.DELETED_SUCCESSFULLY'))
      })
      .catch(function (error) {
        vm.$toast.error(vm.$error(error, 'THREAD_DELETE_FILES'))
      })
    },
  }
}
</script>
