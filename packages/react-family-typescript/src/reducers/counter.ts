import { COUNTER_PLUS } from '../actions';

export const DEFAULT_STATE = {
  nums: 0
};

export default (state = DEFAULT_STATE, action: any) => {
  switch (action.type) {
  case COUNTER_PLUS:
    return Object.assign({}, state, {
      nums: state.nums + action.payload.nums
    });
  default:
    return state;
  }
};
