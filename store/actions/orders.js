import {ADD_ORDER} from '../actionTypes';

const addOrder = (cartItems, totalAmount) => {
  return {
    type: ADD_ORDER,
    orderData: {
      items: cartItems,
      amount: totalAmount,
    },
  };
};

export {addOrder};
