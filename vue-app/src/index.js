import '@babel/polyfill';

import Vue from 'vue';

import './lib';

import store from './store';
import router from './router';

import App from './app';

function init() {
  new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App)
  });
}

init();
