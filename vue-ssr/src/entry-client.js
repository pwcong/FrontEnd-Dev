import { createApp } from './app';

const { app, router, store } = createApp();

router.onReady(() => {
  app.$mount('#app');
});
