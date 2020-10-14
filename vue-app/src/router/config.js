export const routes = [
  {
    path: '/',
    component: () => import('@/pages/index'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/sso',
    component: () => import('@/pages/sso')
  }
];
