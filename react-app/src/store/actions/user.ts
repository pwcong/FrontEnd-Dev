import { IUser } from '../models';

export const ACTIONS_USER_SETUSER = 'ACTIONS_USER_SETUSER';

export const setUser = (user: IUser) => ({
  type: ACTIONS_USER_SETUSER,
  payload: user,
});
