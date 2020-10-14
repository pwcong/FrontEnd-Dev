import {
  DIRECTION_GETTERS_DIRECTION,
  DIRECTION_MUTATIONS_SET_DIRECTION
} from '../types';

export default {
  state: {
    direction: 'forward'
  },
  getters: {
    [DIRECTION_GETTERS_DIRECTION]: state => state.direction
  },
  mutations: {
    [DIRECTION_MUTATIONS_SET_DIRECTION]: (state, payload) => {
      state.direction = payload;
    }
  },
  actions: {}
};
