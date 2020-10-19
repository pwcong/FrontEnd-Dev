import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducer from './reducers';

export * from './types';
export * from './actions';

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
