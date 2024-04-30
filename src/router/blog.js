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
  {
    path: 'post/:pk',
    name: 'blog.read',
    component: () => import('@/views/blog/ReadBlog.vue')
  },
]
