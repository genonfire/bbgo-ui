<template>
  <v-chip
    v-for="tag in tags.split(',').map(item => item.trim())"
    :key="tag"
    :variant="variant"
    :density="density"
    :color="color"
    :label="label"
    class="mr-1 mt-1"
    @click="onTagClick(tag)"
    v-if="tags"
  >
    {{ tag }}
  </v-chip>
</template>

<script>
export default {
  props: {
    tags: String,
    variant: {
      type: String,
      default: 'tonal'
    },
    density: {
      type: String,
      default: 'comfortable'
    },
    color: {
      type: String,
      default: 'pale'
    },
    label: {
      type: Boolean,
      default: false
    },
  },
  methods: {
    onTagClick(tag) {
      this.$router.push({
        name: 'blogs',
        query: {
          tag: tag,
        }
      })
    }
  }
}
</script>
