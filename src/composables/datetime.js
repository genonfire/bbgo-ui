export function useFormatDate() {
  const formatDateTime = (datetime) => {
    if (!datetime) {
      return null
    }
    return new Date(datetime).toLocaleString()
  }

  const formatDate = (datetime) => {
    if (!datetime) {
      return null
    }
    return new Date(datetime).toLocaleDateString()
  }

  const formatTime = (datetime) => {
    if (!datetime) {
      return null
    }
    return new Date(datetime).toLocaleTimeString()
  }

  const formatDateOrTime = (dateOrTime) => {
    if (dateOrTime.date) {
      return formatDate(dateOrTime.date)
    }
    else {
      return dateOrTime.time
    }
  }

  return {
    formatDateTime,
    formatDate,
    formatTime,
    formatDateOrTime,
  }
}
