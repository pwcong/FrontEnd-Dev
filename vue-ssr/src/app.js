import Vue from 'vue';

import { createStore } from './store';
import { createRouter } from './routes';

import App from './pages/App.vue';

export function createApp() {

  const store = createStore();
  const router = createRouter();
  
  const app = new Vue({
    store: store,
    router: router,
    render: h => h(App)
  });

  return {
    app,
    router,
    store
  };
}
