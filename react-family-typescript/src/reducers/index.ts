import { combineReducers } from 'redux';
import counter from './counter';

import { ICounter } from '../models';

export interface IState {
  counter: ICounter;
}

export default combineReducers<IState>({
  counter
});
