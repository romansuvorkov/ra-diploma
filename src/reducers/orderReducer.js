import {FETCH_ORDER_REQUEST, FECTH_ORDER_SUCCESS, FECTH_ORDER_FAILURE} from '../actions/actionTypes';

const initialState = {
  serverResponse: null,
  orderLoading: false,
  orderError: null
};

export default function orderReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ORDER_REQUEST: {
     return {...state, orderLoading: true, orderError: null};
    }
    case FECTH_ORDER_FAILURE: {
      const { orderError } = action.payload;
      return { ...state, orderLoading: false, orderError: orderError};
    }
    case FECTH_ORDER_SUCCESS: {
      const { serverResponse } = action.payload;
      return { ...state, serverResponse: serverResponse, orderLoading: false, orderError: null};
    }
    default:
      return state;
  }
}