import { combineReducers } from 'redux';
import counter from './counter';

import { Counter } from '../models';

export interface State {
  counter: Counter;
}

export default combineReducers<State>({
  counter
});
