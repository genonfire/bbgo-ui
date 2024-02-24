export default {
  ACCOUNTS_SIGNUP: {
    'method': 'post',
    'url': '/accounts/signup/'
  },
  ACCOUNTS_LOGIN: {
    'method': 'post',
    'url': '/accounts/login/'
  },
  ACCOUNTS_CONNECT: {
    'method': 'post',
    'url': '/accounts/connect/'
  },
  ACCOUNTS_LOGOUT: {
    'method': 'post',
    'url': '/accounts/logout/'
  },
  ACCOUNTS_PASSWORD_CHANGE: {
    'method': 'post',
    'url': '/accounts/password/change/'
  },
  ACCOUNTS_PASSWORD_FIND: {
    'method': 'post',
    'url': '/accounts/password/find/'
  },
  ACCOUNTS_PASSWORD_RESET: {
    'method': 'post',
    'url': '/accounts/password/reset/'
  },
  ACCOUNTS_GET_PROFILE: {
    'method': 'get',
    'url': '/accounts/setting/'
  },
  ACCOUNTS_EDIT_PROFILE: {
    'method': 'patch',
    'url': '/accounts/setting/'
  },
  ACCOUNTS_DEACTIVATE: {
    'method': 'post',
    'url': '/accounts/deactivate/'
  },

  FILE_UPLOAD: {
    'method': 'post',
    'url': '/things/file/'
  },
  FILE_DELETE: {
    'method': 'delete',
    'url': '/things/file/{pk}/'
  },
  FILE_LIST: {
    'method': 'get',
    'url': '/things/files/?q='
  },
}
