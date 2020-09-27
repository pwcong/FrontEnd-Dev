import '@babel/polyfill';

import Vue from 'vue';

import App from './pages/app';

new Vue({
  el: '#app',
  render: (h) => h(App),
});
