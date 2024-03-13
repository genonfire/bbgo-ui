// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { useAppStore } from '@/store/app'
import AccountsRoutes from '@/router/accounts'
import ForumRoutes from '@/router/forum'
import AdminRoutes from '@/router/admin'

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
  {
    path: '/forum/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      ...ForumRoutes,
    ]
  },
  {
    path: '/admin/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      ...AdminRoutes
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
      next({
        name: 'accounts.check.login',
        query: {
          nextURL: to.path
        }
      })
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
