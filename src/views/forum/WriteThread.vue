<template>
  <v-container>
    <v-row
      class="mt-1"
    >
      <v-col>
        <v-text-field
          v-model="title"
          :placeholder="$t('forum.THREAD_TITLE')"
        >
        </v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <Tiptap
          :options="options"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn
          variant="outlined"
          color="secondary"
          @click="save"
        >
          {{ $t('action.SAVE') }}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Tiptap from '@/components/Tiptap'
import { useError } from '@/composables/error'

export default {
  setup() {
  },
  components: {
    Tiptap,
  },
  data() {
    return {
      options: {
        content: '',
        supportImage: true,
        supportVideo: true
      },
      title: null,
      init: false,
    }
  },
  computed: {
  },
  mounted() {
  },
  methods: {
    save() {
    },
  }
}
</script>
