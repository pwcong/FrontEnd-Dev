import { COUNTER_PLUS } from '../actions/counter';

export const DEFAULT_STATE = {
  value: 0
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case COUNTER_PLUS:
      return Object.assign({}, state, {
        value: state.value + action.payload.nums
      });
    default:
      return state;
  }
};
