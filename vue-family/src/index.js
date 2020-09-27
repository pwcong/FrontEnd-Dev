import '@babel/polyfill';
import 'normalize-css';

import Vue from 'vue';

import store from './store';
import router from './router';

import App from './pages/app';

new Vue({
  el: '#app',
  store,
  router,
  render: (h) => h(App),
});
