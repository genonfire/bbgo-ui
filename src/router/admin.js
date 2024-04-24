export default [
  {
    path: 'users',
    name: 'admin.users',
    meta: { StaffOnly: true },
    component: () => import('@/views/admin/ManageUsers.vue')
  },
  {
    path: 'blogs',
    name: 'admin.blogs',
    meta: { StaffOnly: true },
    component: () => import('@/views/admin/ManageBlogs.vue')
  },
  {
    path: 'comments',
    name: 'admin.comments',
    meta: { StaffOnly: true },
    component: () => import('@/views/admin/ManageComments.vue')
  },
  {
    path: 'forums',
    name: 'admin.forums',
    meta: { StaffOnly: true },
    component: () => import('@/views/admin/ManageForums.vue')
  },
  {
    path: 'threads',
    name: 'admin.threads',
    meta: { StaffOnly: true },
    component: () => import('@/views/admin/ManageThreads.vue')
  },
  {
    path: 'replies',
    name: 'admin.replies',
    meta: { StaffOnly: true },
    component: () => import('@/views/admin/ManageReplies.vue')
  },
]
