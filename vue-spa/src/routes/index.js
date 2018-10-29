import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: () => import('@/pages/Page1.vue') },
  { path: '/a', component: () => import('@/pages/Page2.vue') },
  { path: '/b', component: () => import('@/pages/Page3.vue') }
];

const router = new VueRouter({
  routes
});

export default router;
