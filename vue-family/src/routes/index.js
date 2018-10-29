import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: () => import('@/pages/Index.vue')
  },
  {
    path: '/page1',
    component: () => import('@/pages/Page1.vue')
  },
  {
    path: '/page2',
    component: () => import('@/pages/Page2.vue')
  }
];

const router = new VueRouter({
  routes
});

export default router;
