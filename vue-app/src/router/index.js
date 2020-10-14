import Vue from 'vue';
import VueRouter from 'vue-router';

import { routes } from './config';
import store, {
  USER_GETTERS_USER,
  LOADING_MUTATIONS_SET_LOADING,
  DIRECTION_MUTATIONS_SET_DIRECTION
} from '../store';

Vue.use(VueRouter);

const router = new VueRouter({
  routes
});

router.beforeEach(async (to, from, next) => {
  // 理页面切换动画
  renderDirection(to, from, next);

  // 登录拦截
  const user = store.getters[USER_GETTERS_USER];

  if (to.meta.requireAuth && !user) {
    next(`/sso?returnUrl=${encodeURIComponent(to.path)}`);
  } else {
    next();
  }
});

router.afterEach(function(to) {
  store.commit(LOADING_MUTATIONS_SET_LOADING, false);
  window.scrollTo(0, 0);
});

const history = window.sessionStorage;
let historyCount = history.getItem('historyCount') * 1 || 0;
history.setItem('/', 0);

// 处理页面切换
export function renderDirection(to, from, next) {
  store.commit(LOADING_MUTATIONS_SET_LOADING, true);
  const toIndex = history.getItem(to.path);
  const fromIndex = history.getItem(from.path);
  if (toIndex) {
    if (
      toIndex > fromIndex ||
      !fromIndex ||
      (toIndex === '0' && fromIndex === '0')
    ) {
      store.commit(DIRECTION_MUTATIONS_SET_DIRECTION, 'forward');
    } else {
      store.commit(DIRECTION_MUTATIONS_SET_DIRECTION, 'reverse');
    }
  } else {
    historyCount += 1;
    history.setItem('historyCount', historyCount);
    to.path !== '/' && history.setItem(to.path, historyCount);
    store.commit(DIRECTION_MUTATIONS_SET_DIRECTION, 'forward');
  }
}

export default router;
