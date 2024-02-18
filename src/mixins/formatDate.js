var FormatDate = {
  methods: {
    formatDateTime: function (datetime) {
      return new Date(datetime).toLocaleString()
    },
    formatDate: function (dateIn) {
      return new Date(dateIn).toLocaleDateString()
    },
    formatTime: function (dateIn) {
      return new Date(dateIn).toLocaleTimeString()
    },
  }
}

export default FormatDate
