<template>
  <v-container>
    <v-row
      class="mt-0"
    >
      <v-col>
        <v-text-field
          v-model="title"
          variant="outlined"
          density="compact"
          :placeholder="$t('blog.TITLE')"
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

    <v-row>
      <v-col>
        <v-card
          variant="outlined"
          density="compact"
          class="rounded-lg border-dashed"
        >
          <v-card-title
            class="text-body-1"
          >
            {{ $t('blog.FEATURED_IMAGE') }}
          </v-card-title>
          <v-file-input
            v-model="file"
            density="compact"
            accept="image/*"
            prepend-icon=""
            prepend-inner-icon="mdi-camera"
            :label="file ? null : $t('tiptap.SELECT_IMAGE')"
            @change="handleFileChange"
            show-size
            class="mx-4"
          >
          </v-file-input>
          <img
            :src="featuredImage.file"
            class="ml-4 mr-10"
            :width="smAndUp ? 240 : 120"
            :height="smAndUp ? 240 : 120"
            v-if="featuredImage"
          >
        </v-card>
      </v-col>
    </v-row>
    <v-row
      class="mt-6"
    >
      <v-col>
        <v-text-field
          v-model="tags"
          variant="outlined"
          density="comfortable"
          :placeholder="$t('hint.TAGS_HERE')"
        >
        </v-text-field>
      </v-col>
    </v-row>
    <v-row
      class="my-1"
    >
      <v-col>
        <v-select
          v-model="category"
          variant="outlined"
          density="comfortable"
          :label="$t('blog.CATEGORY')"
          :items="$store.getBlogOption.category"
          v-if="$store.getBlogOption.category"
        ></v-select>
      </v-col>
      <v-col
        class="d-flex justify-center"
      >
        <v-switch
          v-model="publish"
          color="secondary"
          :label="$t('blog.PUBLISH')"
        >
        </v-switch>
      </v-col>
    </v-row>
    <v-row
      class="my-3"
    >
      <v-col
        class="text-right"
      >
        <v-btn
          color="secondary"
          class="px-8"
          @click="save"
          :disabled="!title || !options.content || !category"
        >
          {{ $t('action.SAVE') }}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Tiptap from '@/components/Tiptap'
import { useDisplay } from 'vuetify'

export default {
  setup() {
    const { smAndUp } = useDisplay()
    return { smAndUp }
  },
  components: {
    Tiptap,
  },
  data() {
    return {
      title: null,
      options: {
        content: '',
        supportImage: true,
        supportVideo: true,
      },
      file: null,
      featuredImage: null,
      tags: null,
      category: null,
      publish: true,
      saved: false,
    }
  },
  mounted() {
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
    save() {
      const vm = this

      let data = {
        title: this.title,
        content: this.options.content,
        category: this.category,
        tags: this.tags,
        is_published: this.publish,
      }
      if (this.featuredImage) {
        data['image'] = {
          id: this.featuredImage.id
        }
      }

      this.$axios({
        method: this.$api('WRITE_BLOG').method,
        url: this.$api('WRITE_BLOG').url,
        data: data
      })
      .then(function (response) {
        vm.saved = true
        vm.$toast.success(vm.$t('message.SAVED_SUCCESSFULLY'))

        vm.$router.replace({
          name: 'blogs',
        })
      })
      .catch(function (error) {
        vm.$toast.error(vm.$error(error, 'WRITE_BLOG'))
      })
    },
    imageUpload(data) {
      var vm = this

      this.$axios({
        method: this.$api('FILE_UPLOAD').method,
        url: this.$api('FILE_UPLOAD').url,
        data: data,
      })
      .then(function (response) {
        vm.featuredImage = response.data['data']
      })
      .catch(function (error) {
        vm.$toast.error(vm.$error(error, 'FILE_UPLOAD'))
      })
    },
    handleFileChange() {
      if (this.file) {
        let formData = new FormData()
        formData.append('file', this.file)
        this.imageUpload(formData)
      }
    },
  }
}
</script>
