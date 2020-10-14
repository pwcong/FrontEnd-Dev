import { USER_MUTATIONS_SET_USER, USER_GETTERS_USER } from '../types';

export default {
  state: {
    user: null
  },
  getters: {
    [USER_GETTERS_USER]: state => state.user
  },
  mutations: {
    [USER_MUTATIONS_SET_USER]: (state, payload) => {
      if (!payload) {
        window.sessionStorage.removeItem('user');
      } else {
        window.sessionStorage.setItem('user', JSON.stringify(payload));
      }
      state.user = payload;
    }
  },
  actions: {}
};
