// Composables
import { createRouter, createWebHistory } from 'vue-router'
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

export default router
