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
          v-model="title"
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
      v-if="forum.support_files"
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
            v-if="files"
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
      class="mt-5"
    >
      <v-col></v-col>
      <v-col
        class="text-right"
      >
        <v-btn
          variant="outlined"
          color="secondary"
          @click="save"
          :disabled="!title || !options.content || !forum.permissions.write"
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
      forum: null,
      title: null,
      options: {
        content: '',
        supportImage: true,
        supportVideo: true,
      },
      files: [],
      fileChips: [],
      isHovering: false,
      saved: false,
      init: false,
    }
  },
  mounted() {
    this.seekForum(this.$route.params.forum)
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
    seekForum(forum) {
      const vm = this

      this.$axios({
        method: this.$api('THREAD_SEEK').method,
        url: this.$api('THREAD_SEEK').url.replace('{forum}', forum),
      })
      .then(function (response) {
        vm.forum = response.data['data']
        vm.init = true
      })
      .catch(function (error) {
        vm.$toast.error(vm.$error(error, 'THREAD_SEEK'))
      })
    },
    save() {
      const vm = this
      let data = {
        title: this.title,
        content: this.options.content,
      }
      let files = []

      if (this.files) {
        for (let i=0; i<this.files.length; i++) {
          files.push({
            id: this.files[i].id
          })
        }

        data.files = files
      }

      this.$axios({
        method: this.$api('THREAD_WRITE').method,
        url: this.$api('THREAD_WRITE').url.replace('{forum}', this.forum.name),
        data: data
      })
      .then(function (response) {
        vm.saved = true
        vm.$toast.success(vm.$t('message.SAVED_SUCCESSFULLY'))

        vm.$router.replace({
          name: 'thread',
          params: {
            forum: vm.forum.name
          }
        })
      })
      .catch(function (error) {
        vm.$toast.error(vm.$error(error, 'THREAD_WRITE'))
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

      if (this.forum.support_files) {
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
            vm.files.push(response.data['data'])
            vm.fileChips.push(response.data['data'])
          })
          .catch(function (error) {
            vm.$toast.error(vm.$error(error, 'FILE_UPLOAD'))
          })
        }

      }
    },
    removeItem(item) {
      const index = this.files.indexOf(item)
      this.files.splice(index, 1)
    },
  }
}
</script>
