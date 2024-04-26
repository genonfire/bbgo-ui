<template>
  <v-chip
    v-for="(tag, index) in tags.split(',').map(item => item.trim())"
    :key="index"
    :variant="variant"
    :density="density"
    :color="color"
    class="mr-1 mt-1"
    @click="onTagClick(tag)"
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
      default: 'primary'
    }
  },
  methods: {
    onTagClick(tag) {
    }
  }
}
</script>
