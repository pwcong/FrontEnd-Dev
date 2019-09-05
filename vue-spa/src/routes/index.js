import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: () => import('@/pages/page1') },
  { path: '/a', component: () => import('@/pages/page2') },
  { path: '/b', component: () => import('@/pages/page3') }
];

const router = new VueRouter({
  routes
});

export default router;
