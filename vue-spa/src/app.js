import Vue from 'vue';

import router from './routes';

import App from './pages/App.vue';

new Vue({
    el: '#app',
    router,
    render: h => h(App)
});