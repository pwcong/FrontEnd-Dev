import { ACTIONS_USER_SETUSER } from '../actions';
import { IUserState } from '../models';

export const DEFAULT_STATE: IUserState = {};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case ACTIONS_USER_SETUSER:
      console.log(action.payload);
      return Object.assign({}, state, {
        user: action.payload,
      });
    default:
      return state;
  }
};
