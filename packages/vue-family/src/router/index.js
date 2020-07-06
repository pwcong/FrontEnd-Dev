import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: () => import('@/pages/index')
  },
  {
    path: '/page1',
    component: () => import('@/pages/page1')
  },
  {
    path: '/page2',
    component: () => import('@/pages/page2')
  }
];

const router = new VueRouter({
  routes
});

export default router;
