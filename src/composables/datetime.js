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

  return {
    formatDateTime,
    formatDate,
    formatTime,
  }
}
