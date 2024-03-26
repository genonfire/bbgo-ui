export default [
  {
    path: 'f/:forum',
    name: 'thread',
    component: () => import('@/views/forum/Thread.vue')
  },
  {
    path: 'f/:forum/:page',
    name: 'thread.page',
    component: () => import('@/views/forum/Thread.vue?1234')
  },
  {
    path: 'f/:forum/write',
    name: 'thread.write',
    component: () => import('@/views/forum/WriteThread.vue')
  },
  {
    path: 'f/:forum/read/:thread/:title',
    name: 'thread.read',
    component: () => import('@/views/forum/ReadThread.vue')
  },
]
