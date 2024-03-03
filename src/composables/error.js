// eslint-disable-next-line no-unused-vars
export function useError(error, api=null) {
  let message = ''

  if (error.response && error.response.data['error']) {
    const e = error.response.data['error']

    if (e['code'] == 'DRF_FIELD_ERROR') {
      message = e['field'][e['keys'][0]][0]
    }
    else {
      message = e['message']
    }
  }

  return message
}
