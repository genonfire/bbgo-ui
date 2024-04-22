export default [
  {
    path: 'f/:forum',
    name: 'thread',
    component: () => import('@/views/forum/Thread.vue')
  },
  {
    path: 'f/:forum/:page',
    name: 'thread.page',
    component: () => import('@/views/forum/Thread.vue')
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
  {
    path: 'f/:forum/read/:thread/:reply/:title',
    name: 'thread.reply',
    component: () => import('@/views/forum/ReadThread.vue')
  },
  {
    path: 'f/:forum/edit/:thread/',
    name: 'thread.edit',
    component: () => import('@/views/forum/EditThread.vue')
  },
  {
    path: 'f/:forum/trash',
    name: 'thread.trash',
    component: () => import('@/views/forum/Trash.vue')
  },
  {
    path: 'f/:forum/trash/:page',
    name: 'thread.trash.page',
    component: () => import('@/views/forum/Trash.vue')
  },
]
