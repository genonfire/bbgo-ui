<template>
  <div
    ref="observer"
  >
  </div>
</template>

<script>
export default {
  data () {
    return {
      observer: null,
      observerOptions: {
        rootMargin: '0px',
        threshold: 1.0
      }
    }
  },
  mounted () {
    this.createObserver()
  },
  beforeDestroy () {
    if (this.observer) {
      this.observer.disconnect()
    }
  },
  methods: {
    createObserver () {
      this.observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          this.$emit('show')
        }
        else {
          this.$emit('hidden')
        }
      }, this.observerOptions)

      this.observer.observe(this.$refs.observer)
    }
  }
}
</script>
