import {ADD_TO_CART, REMOVE_CART_ITEM} from '../actionTypes';

const addToCart = product => {
  return {
    type: ADD_TO_CART,
    product: product,
  };
};

const removeFromCart = productId => {
  return {
    type: REMOVE_CART_ITEM,
    id: productId,
  };
};

export {addToCart, removeFromCart};
