import {CART_ADD_ITEM, CART_REMOVE_ITEM, CART_CLEAR} from '../actions/actionTypes';

const initialState = {
  cart: [],
  totalSum: 0
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case CART_ADD_ITEM: {
      const { product } = action.payload;
      const itemAlreadyInCart = state.cart.find((item) => item.id === product.id && item.size === product.size);
      let newItem;
      if (!itemAlreadyInCart) {
        newItem = {
          id: product.id,
          title: product.title,
          size: product.size,
          price: product.price,          
          count: product.count,
          totalPrice: product.price * product.count
        };
      }

      if (itemAlreadyInCart) {
        newItem = {
          ...itemAlreadyInCart,
          count: itemAlreadyInCart.count + product.count,
          price: product.price,
          totalPrice: (itemAlreadyInCart.count + product.count) * product.price
        };
      }
      const newCart = state.cart.filter((item) => !(item.id === product.id && item.size === product.size));
      const outputCart = [...newCart, newItem];
      let newSum = 0;
      for (let item of outputCart) {
        newSum += item.totalPrice;
      }
      localStorage.cart = JSON.stringify(outputCart);
      localStorage.totalSum = newSum;

      return { ...state, cart: outputCart,  totalSum: newSum};
      }
    case CART_REMOVE_ITEM: {
      const { removedID } = action.payload;
      const filteredCart = state.cart.filter((o) => o.id !== removedID);
      localStorage.cart = JSON.stringify(filteredCart);
      let newSum = 0;
      for (let item of filteredCart) {
        newSum += item.totalPrice;
      }
      localStorage.totalSum = newSum;
      return { ...state, cart: filteredCart,  totalSum: newSum};
    }
    case CART_CLEAR: {
      localStorage.clear();
      return { cart: [], totalSum: 0 };
    }
    default:
      if (localStorage.cart) {
        return {  cart: JSON.parse(localStorage.cart), totalSum: parseInt(localStorage.totalSum, 10) }
      }
      return state;
  }
}