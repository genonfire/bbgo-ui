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
    path: 'write',
    name: 'blog.write',
    component: () => import('@/views/blog/WriteBlog.vue')
  },
  {
    path: 'post/:blog/:title?',
    name: 'blog.read',
    component: () => import('@/views/blog/ReadBlog.vue')
  },
  {
    path: 'post/edit/:blog',
    name: 'blog.edit',
    component: () => import('@/views/blog/EditBlog.vue')
  },
]
