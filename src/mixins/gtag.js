import { event } from 'vue-gtag'

export default {
  methods: {
    gtag_signup() {
      event('signup')
    },
  }
}
