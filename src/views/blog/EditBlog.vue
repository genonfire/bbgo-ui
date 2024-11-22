<template>
  <v-container
    v-if="init"
  >
    <v-row
      class="mt-0"
    >
      <v-col>
        <v-text-field
          v-model="blog.title"
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
            @click:clear="featuredImage = null"
            show-size
            class="mx-4"
          >
          </v-file-input>
          <v-img
            :src="featuredImage.file"
            class="ml-4 mb-4"
            :width="smAndUp ? 240 : 120"
            :height="smAndUp ? 240 : 120"
            v-if="featuredImage"
          ></v-img>
        </v-card>
      </v-col>
    </v-row>
    <v-row
      class="mt-6"
    >
      <v-col>
        <v-text-field
          v-model="blog.tags"
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
          v-model="blog.category"
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
          v-model="blog.is_published"
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
          variant="flat"
          color="secondary"
          class="px-8"
          @click="save"
          :disabled="!blog.title || !options.content || !blog.category"
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
      blog: null,
      options: {
        content: '',
      },
      file: null,
      featuredImage: null,
      saved: false,
      init: false,
    }
  },
  mounted() {
    this.getBlog(this.$route.params.blog)
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
    getBlog(blog) {
      const vm = this

      this.$axios({
        method: this.$api('READ_BLOG').method,
        url: this.$api('READ_BLOG').url.replace('{pk}', blog),
      })
      .then(function (response) {
        vm.blog = response.data['data']
        vm.options.content = vm.blog.content

        if (vm.blog.image) {
          vm.featuredImage = vm.blog.image
          vm.file = {
            name: vm.blog.image.filename,
            size: vm.blog.image.size,
            type: vm.blog.image.content_type
          }
        }

        vm.init = true
      })
      .catch(function (error) {
        vm.$toast.error(vm.$error(error, 'READ_BLOG'))
      })
    },
    save() {
      const vm = this

      let data = {
        title: this.blog.title,
        content: this.options.content,
        category: this.blog.category,
        tags: this.blog.tags,
        is_published: this.blog.is_published,
        image: null,
      }
      if (this.featuredImage) {
        data['image'] = {
          id: this.featuredImage.id
        }
      }

      this.$axios({
        method: this.$api('EDIT_BLOG').method,
        url: this.$api('EDIT_BLOG').url.replace('{pk}', this.blog.id),
        data: data
      })
      .then(function (response) {
        vm.saved = true
        vm.$toast.success(vm.$t('message.SAVED_SUCCESSFULLY'))

        if (response.data['data']['is_published']) {
          vm.$router.back()
        }
        else {
          vm.$router.push({ name: 'blogs' })
        }
      })
      .catch(function (error) {
        vm.$toast.error(vm.$error(error, 'EDIT_BLOG'))
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
