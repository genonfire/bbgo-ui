import axios from 'axios'

export function useDownload(method, url, label='download') {
  axios({
    method: method,
    url: url,
    responseType: 'blob'
  })
  .then(function (response) {
    const blob = new Blob(
      [response.data],
      { type: response.headers['content-type'] }
    )

    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = label

    link.click()
    URL.revokeObjectURL(link.href)
  })
}
