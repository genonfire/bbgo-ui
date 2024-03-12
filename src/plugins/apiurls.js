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

  ADMIN_USERS: {
    'method': 'get',
    'url': '/admin/users/'
  },
  ADMIN_EXPORT_USERS: {
    'method': 'get',
    'url': '/admin/users/export/'
  },
  ADMIN_USER: {
    'method': 'get',
    'url': '/admin/users/{pk}/'
  },
  ADMIN_EDIT_USER: {
    'method': 'patch',
    'url': '/admin/users/{pk}/'
  },
  ADMIN_DELETE_USER: {
    'method': 'delete',
    'url': '/admin/users/{pk}/'
  },
  ADMIN_STAFFS: {
    'method': 'get',
    'url': '/admin/users/staff/'
  },
  ADMIN_STAFF: {
    'method': 'get',
    'url': '/admin/users/staff/{pk}/'
  },
  ADMIN_EDIT_STAFF: {
    'method': 'patch',
    'url': '/admin/users/staff/{pk}/'
  },
  ADMIN_DELETE_STAFF: {
    'method': 'delete',
    'url': '/admin/users/staff/{pk}/'
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
