export default [
  {
    path: '',
    name: 'blogs',
    component: () => import('@/views/blog/Blogs.vue')
  },
  {
    path: ':page',
    name: 'blogs.page',
    component: () => import('@/views/blog/Blogs.vue')
  },
]
