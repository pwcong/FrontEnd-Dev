export const routes = [
  {
    path: '/',
    exact: true,
    component: () => import('@/pages/index'),
    meta: {
      requireAuth: true,
    },
  },
  {
    path: '/sso',
    exact: true,
    component: () => import('@/pages/sso'),
  },
  {
    path: '/test',
    exact: true,
    component: () => import('@/pages/test'),
    meta: {
      requireAuth: true,
    },
  },
];
