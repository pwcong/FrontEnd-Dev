import { combineReducers } from 'redux';
import { IStoreState } from '../types';

import user from './user';

export default combineReducers<IStoreState>({
  user,
});
