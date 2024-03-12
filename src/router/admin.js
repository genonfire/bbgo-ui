export default [
  {
    path: 'users',
    name: 'admin.users',
    meta: { StaffOnly: true },
    component: () => import('@/views/admin/Users.vue')
  },
]
