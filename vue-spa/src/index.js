import '@babel/polyfill';

import Vue from 'vue';

import router from './routes';

import App from './pages/app';

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
