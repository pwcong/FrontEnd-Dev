import {
  SAMPLE_MUTATIONS_SET,
  SAMPLE_ACTIONS_INIT,
  SAMPLE_ACTIONS_PLUS,
  SAMPLE_ACTIONS_PLUS_ASYNC
} from '../types';

export default {
  state: {
    counts: 0
  },
  getters: {},
  mutations: {
    [SAMPLE_MUTATIONS_SET]: (state, payload) => {
      state.counts = payload.counts;
    }
  },
  actions: {
    [SAMPLE_ACTIONS_INIT]: ({ commit, state }, payload) => {
      commit(SAMPLE_MUTATIONS_SET, payload);
    },
    [SAMPLE_ACTIONS_PLUS]: ({ commit, state }) => {
      commit(SAMPLE_MUTATIONS_SET, {
        counts: state.counts + 1
      });
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
