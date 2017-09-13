import Vue from 'vue';
import VueRouter from 'vue-router';

import Page1 from '../pages/Page1.vue';
import Page2 from '../pages/Page2.vue';
import Page3 from '../pages/Page3.vue';

Vue.use(VueRouter);

const routes = [

    {path: '/', component: Page1},
    {path: '/a', component: Page2},
    {path: '/b', component: Page3}

]

const router = new VueRouter({
    routes
});

export default router;