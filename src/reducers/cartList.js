import {CART_ADD_ITEM, CART_REMOVE_ITEM, CART_CLEAR} from '../actions/actionTypes';

const initialState = {
  cart: []
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case CART_ADD_ITEM: {
      const { product } = action.payload;
    //   console.log('product');
    //   console.log(product);
      const itemAlreadyInCart = state.cart.find((item) => item.id === product.id && item.size === product.size);
    //   console.log('itemAlreadyInCart');
    //   console.log(itemAlreadyInCart);
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
          total: (itemAlreadyInCart.count + product.count) * product.price
        };
      }
    //   console.log('newItem');
    //   console.log(newItem);
      const newCart = state.cart.filter((item) => !(item.id === product.id && item.size === product.size));
    //   console.log('newCart');
    //   console.log(newCart);
      localStorage.cart = JSON.stringify([...newCart, newItem]);
      return { cart: [...newCart, newItem] };
      }
    case CART_REMOVE_ITEM: {
      const { removedID } = action.payload;
      const filteredCart = state.cart.filter((o) => o.id !== removedID);
      localStorage.cart = JSON.stringify(filteredCart);
      return { ...state, cart: filteredCart };
    }
    case CART_CLEAR: {
      localStorage.clear();
      return { cart: [] };
    }
    default:
      if (localStorage.cart) {
        return {  cart: JSON.parse(localStorage.cart) }
      }
      return state;
  }
}