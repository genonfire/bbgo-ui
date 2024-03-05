export default [
  {
    path: 'signup',
    name: 'accounts.signup',
    component: () => import('@/views/accounts/Signup.vue')
  },
  {
    path: 'check/login',
    name: 'accounts.check.login',
    component: () => import('@/views/accounts/CheckLogin.vue')
  },
  {
    path: 'password/find',
    name: 'accounts.password.find',
    component: () => import('@/views/accounts/FindPassword.vue')
  },
  {
    path: 'password/reset/:uid/:token/',
    name: 'accounts.password.reset',
    component: () => import('@/views/accounts/ResetPassword.vue')
  },
  {
    path: 'profile',
    name: 'accounts.profile',
    meta: { requiresAuth: true },
    component: () => import('@/views/accounts/Profile.vue')
  },
  {
    path: 'settings',
    name: 'accounts.settings',
    meta: { requiresAuth: true },
    component: () => import('@/views/accounts/Settings.vue')
  },
  {
    path: 'password/change',
    name: 'accounts.password.change',
    meta: { requiresAuth: true },
    component: () => import('@/views/accounts/ChangePassword.vue')
  },
  {
    path: 'delete',
    name: 'accounts.delete',
    meta: { requiresAuth: true },
    component: () => import('@/views/accounts/DeleteAccount.vue')
  },
]
