import Vue from 'vue';
import VueRouter from 'vue-router';

import Index from '@/pages/Index.vue';
import Page1 from '@/pages/Page1.vue';
import Page2 from '@/pages/Page2.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Index
  },
  {
    path: '/page1',
    component: Page1
  },
  {
    path: '/page2',
    component: Page2
  }
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

export default router;
