<template>
</template>

<script>
export default {
  mounted () {
    const nextURL = this.$route.query.nextURL

    if (this.$store.isApproved && nextURL) {
      this.$router.push({
        path: nextURL,
        params: this.$route.params
      })
    }
  }
}
</script>
