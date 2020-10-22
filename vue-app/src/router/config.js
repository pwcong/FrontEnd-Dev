export const routes = [
  {
    path: '/',
    name: 'page-index',
    component: () => import('@/pages/index'),
    meta: {
      requireAuth: true,
    },
  },
  {
    path: '/sso',
    name: 'page-sso',
    component: () => import('@/pages/sso'),
  },
];
