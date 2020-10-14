import {
  LOADING_GETTERS_LOADING,
  LOADING_MUTATIONS_SET_LOADING
} from '../types';

export default {
  state: {
    loading: false
  },
  getters: {
    [LOADING_GETTERS_LOADING]: state => state.loading
  },
  mutations: {
    [LOADING_MUTATIONS_SET_LOADING]: (state, payload) => {
      state.loading = payload;
    }
  },
  actions: {}
};
