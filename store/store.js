import {createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';

import rootReducers from './reducers/index';

const compose =
  process.env.NODE_ENV === 'development' ? composeWithDevTools() : null;

const store = createStore(rootReducers, compose);

export default store;
