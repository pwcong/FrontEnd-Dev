import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: () => import('@/pages/Page1') },
  { path: '/a', component: () => import('@/pages/Page2') },
  { path: '/b', component: () => import('@/pages/Page3') }
];

const router = new VueRouter({
  routes
});

export default router;
