import Vue from 'vue';

import 'minireset.css';

import VueScroller from 'vue-scroller';
import VueCookies from 'vue-cookies';
import Vant from 'vant';
import 'vant/lib/index.less';
import '@/assets/css/vant.scss';

import axios from 'axios';
import VConsole from 'vconsole';

import Flexible from '@/common/lib/flexible';
import config from '@/config';
import Components from '@/components';
import lib from '@/common/lib';

Vue.prototype.$axios = axios;
Vue.prototype.$config = config;
Vue.prototype.$tools = Object.keys(lib).reduce(
  (p, c) => Object.assign(p, lib[c]),
  {}
);

Vue.use(Flexible);
Vue.use(Vant);
Vue.use(VueScroller);
Vue.use(VueCookies);
Vue.use(Components);

if (config.env === 'test') {
  new VConsole();
}
