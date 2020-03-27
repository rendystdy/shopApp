import {combineReducers} from 'redux';

import productsReducer from './products';
import cartReducer from './cart';
import ordersReducer from './orders';

const rootReducers = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
});

export default rootReducers;
