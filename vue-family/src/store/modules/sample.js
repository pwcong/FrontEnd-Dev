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
    [SAMPLE_MUTATIONS_PLUS]: (state, payload) => {
      state.counts++;
    }
  },
  actions: {
    [SAMPLE_ACTIONS_PLUS]: ({ commit, state }) => {
      commit(SAMPLE_MUTATIONS_PLUS);
    },
    [SAMPLE_ACTIONS_PLUS_ASYNC]: ({ dispatch, commit, state }, payload) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          dispatch(SAMPLE_ACTIONS_PLUS);
          resolve();
        }, payload.time);
      });
    }
  }
};

export default store;
