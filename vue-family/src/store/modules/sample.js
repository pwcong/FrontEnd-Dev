import {
  SAMPLE_MUTATIONS_PLUS,
  SAMPLE_ACTIONS_PLUS,
  SAMPLE_ACTIONS_PLUS_ASYNC
} from '../types';

const store = {
  state: {
    counts: 0
  },
  getters: {
    counts: state => state.counts
  },
  mutations: {
    [SAMPLE_MUTATIONS_PLUS]: (state) => {
      state.counts++;
    }
  },
  actions: {
    [SAMPLE_ACTIONS_PLUS]: ({ commit }) => {
      commit(SAMPLE_MUTATIONS_PLUS);
    },
    [SAMPLE_ACTIONS_PLUS_ASYNC]: ({ dispatch }, payload) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          dispatch(SAMPLE_ACTIONS_PLUS);
          resolve();
        }, payload.time);
      });
    }
  }
};

export default store;
