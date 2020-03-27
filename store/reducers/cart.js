import {ADD_TO_CART, REMOVE_CART_ITEM} from '../actionTypes';
import CartItem from '../../models/cart-item';

const initialState = {
  items: {},
  totalAmount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const prodTitle = addedProduct.title;
      const prodPrice = addedProduct.price;

      let updatedOrNewCartItem;

      if (state.items[addedProduct.id]) {
        //already have the item in the cart
        updatedOrNewCartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          prodPrice,
          prodTitle,
          state.items[addedProduct.id].sum + prodPrice,
        );
      } else {
        updatedOrNewCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice);
      }

      return {
        ...state,
        items: {...state.items, [addedProduct.id]: updatedOrNewCartItem},
        totalAmount: state.totalAmount + prodPrice,
      };
    case REMOVE_CART_ITEM:
      const selectedCardItem = state.items[action.id];
      const currentQty = selectedCardItem.quantity;
      let updatedCartItems;
      if (currentQty > 1) {
        const updatedCartItem = new CartItem(
          selectedCardItem.quantity - 1,
          selectedCardItem.productPrice,
          selectedCardItem.productTitle,
          selectedCardItem.sum - selectedCardItem.productPrice,
        );
        updatedCartItems = {...state.items, [action.id]: updatedCartItem};
      } else {
        updatedCartItems = {...state.items};
        delete updatedCartItems[action.id];
      }

      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - selectedCardItem.productPrice,
      };

    default:
      return state;
  }
};
