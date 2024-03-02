// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { useAppStore } from '@/store/app'
import AccountsRoutes from '@/router/accounts'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/Home.vue'),
      },
    ]
  },
  {
    path: '/accounts/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      ...AccountsRoutes,
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const store = useAppStore()

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.isApproved) {
      next(false)
    }
    else if (to.matched.some(record => record.meta.StaffOnly)) {
      if (!store.isStaff) {
        next(false)
      }
    }
    else {
      next()
    }
  }
  else {
    next()
  }
})

export default router
