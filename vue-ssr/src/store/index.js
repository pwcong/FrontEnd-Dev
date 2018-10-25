import Vue from 'vue';
import Vuex from 'vuex';

import sampleModule from './modules/sample';

Vue.use(Vuex);

export function createStore() {
  const store = new Vuex.Store({
    modules: {
      sample: sampleModule
    }
  });

  return store;
}
