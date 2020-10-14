import Vue from 'vue';
import Vuex from 'vuex';

import user from './modules/user';
import direction from './modules/direction';
import loading from './modules/loading';

export * from './types';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    user,
    direction,
    loading
  }
});

export default store;
