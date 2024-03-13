export default [
  {
    path: 'users',
    name: 'admin.users',
    meta: { StaffOnly: true },
    component: () => import('@/views/admin/Users.vue')
  },
  {
    path: 'forums',
    name: 'admin.forums',
    meta: { StaffOnly: true },
    component: () => import('@/views/admin/Forums.vue')
  },
]
