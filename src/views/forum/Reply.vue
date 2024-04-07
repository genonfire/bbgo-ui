<template>
  <v-container
    class="pa-0"
  >
  </v-container>
</template>

<script>
export default {
  props: {
    thread: Object
  },
  data () {
    return {
      replies: null,
      pageSize: 50,
      init: false,
      replyDialog: false,
    }
  },
  mounted () {
    this.getReplies()
  },
  methods: {
    getReplies() {
      const vm = this
      const url = `${this.$api('THREAD_REPLIES').url.replace('{pk}', this.thread.id)}?page_size=${this.pageSize}`

      this.$axios({
        method: this.$api('THREAD_REPLIES').method,
        url: url,
      })
      .then(function (response) {
        vm.replies = response.data['data']
        vm.init = true
      })
      .catch(function (error) {
        vm.$toast.error(vm.$error(error, 'THREAD_REPLIES'))
      })
    },
  }
}
</script>

<style scoped>
  .reply-content {
    white-space: break-spaces;
  }
</style>
