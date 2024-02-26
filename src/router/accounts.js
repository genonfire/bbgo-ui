export default [
  {
    path: 'signup',
    name: 'accounts.signup',
    component: () => import('@/views/accounts/Signup.vue')
  },
  {
    path: 'profile',
    name: 'accounts.profile',
    component: () => import('@/views/accounts/Profile.vue')
  },
  {
    path: 'settings',
    name: 'accounts.settings',
    component: () => import('@/views/accounts/Settings.vue')
  },
  {
    path: 'password/change',
    name: 'accounts.password.change',
    component: () => import('@/views/accounts/ChangePassword.vue')
  },
  {
    path: 'password/find',
    name: 'accounts.password.find',
    component: () => import('@/views/accounts/FindPassword.vue')
  },
]
