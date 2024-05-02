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

  FORUM_CREATE: {
    'method': 'post',
    'url': '/communities/forum/'
  },
  FORUM_EDIT: {
    'method': 'patch',
    'url': '/communities/forum/{pk}/'
  },
  FORUM_DELETE: {
    'method': 'delete',
    'url': '/communities/forum/{pk}/'
  },
  FORUMS: {
    'method': 'get',
    'url': '/communities/forums/'
  },
  FORUM: {
    'method': 'get',
    'url': '/communities/forums/{pk}/'
  },
  THREAD_LIST: {
    'method': 'get',
    'url': '/communities/f/{forum}/'
  },
  THREAD_SEEK: {
    'method': 'get',
    'url': '/communities/f/{forum}/seek/'
  },
  THREAD_WRITE: {
    'method': 'post',
    'url': '/communities/f/{forum}/write/'
  },
  THREAD_EDIT: {
    'method': 'patch',
    'url': '/communities/f/{forum}/{pk}/'
  },
  THREAD_DELETE: {
    'method': 'delete',
    'url': '/communities/f/{forum}/{pk}/'
  },
  THREAD_RESTORE: {
    'method': 'post',
    'url': '/communities/f/{forum}/restore/{pk}/'
  },
  THREAD_PIN: {
    'method': 'post',
    'url': '/communities/f/{forum}/pin/{pk}/'
  },
  THREAD_UNPIN: {
    'method': 'post',
    'url': '/communities/f/{forum}/unpin/{pk}/'
  },
  THREAD_ATTACH_FILES: {
    'method': 'post',
    'url': '/communities/f/{forum}/{pk}/file/'
  },
  THREAD_DELETE_FILES: {
    'method': 'delete',
    'url': '/communities/f/{forum}/{pk}/file/'
  },
  THREAD_READ: {
    'method': 'get',
    'url': '/communities/f/{forum}/read/{pk}/'
  },
  THREAD_UP: {
    'method': 'post',
    'url': '/communities/f/{forum}/up/{pk}/'
  },
  THREAD_DOWN: {
    'method': 'post',
    'url': '/communities/f/{forum}/down/{pk}/'
  },
  THREAD_TRASH: {
    'method': 'get',
    'url': '/communities/f/{forum}/trash/'
  },
  THREAD_REPLIES: {
    'method': 'get',
    'url': '/communities/f/{pk}/replies/'
  },
  THREAD_REPLY: {
    'method': 'post',
    'url': '/communities/f/{pk}/reply/'
  },
  REPLY_EDIT: {
    'method': 'patch',
    'url': '/communities/r/{pk}/'
  },
  REPLY_DELETE: {
    'method': 'delete',
    'url': '/communities/r/{pk}/'
  },
  REPLY_UP: {
    'method': 'post',
    'url': '/communities/r/{pk}/up/'
  },
  REPLY_DOWN: {
    'method': 'post',
    'url': '/communities/r/{pk}/down/'
  },

  BLOG_OPTION: {
    'method': 'get',
    'url': '/contents/blog_option/'
  },
  EDIT_BLOG_OPTION: {
    'method': 'patch',
    'url': '/contents/blog_option/'
  },
  WRITE_BLOG: {
    'method': 'post',
    'url': '/contents/blog/'
  },
  EDIT_BLOG: {
    'method': 'patch',
    'url': '/contents/blog/{pk}/'
  },
  DELETE_BLOG: {
    'method': 'delete',
    'url': '/contents/blog/{pk}/'
  },
  BLOG_LIST: {
    'method': 'get',
    'url': '/contents/blogs/'
  },
  READ_BLOG: {
    'method': 'get',
    'url': '/contents/blogs/{pk}/'
  },
  LIKE_BLOG: {
    'method': 'post',
    'url': '/contents/blogs/{pk}/like/'
  },
  BLOG_COMMENTS: {
    'method': 'get',
    'url': '/contents/blogs/{pk}/comments/'
  },
  BLOG_COMMENT: {
    'method': 'post',
    'url': '/contents/blogs/{pk}/comment/'
  },
  EDIT_COMMENT: {
    'method': 'patch',
    'url': '/contents/comment/{pk}/'
  },
  DELETE_COMMENT: {
    'method': 'delete',
    'url': '/contents/comment/{pk}/'
  },

  FILE_UPLOAD: {
    'method': 'post',
    'url': '/things/file/'
  },
  FILE_DELETE: {
    'method': 'delete',
    'url': '/things/file/{pk}/'
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
  ADMIN_BLOGS: {
    'method': 'get',
    'url': '/admin/blogs/'
  },
  ADMIN_COMMENTS: {
    'method': 'get',
    'url': '/admin/comments/'
  },
  ADMIN_THREADS: {
    'method': 'get',
    'url': '/admin/threads/'
  },
  ADMIN_REPLIES: {
    'method': 'get',
    'url': '/admin/replies/'
  },
  ADMIN_FILES: {
    'method': 'get',
    'url': '/admin/files/'
  },
}
