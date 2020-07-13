import {FETCH_ITEMS_REQUEST, FETCH_ITEMS_SUCCESS, FETCH_ITEMS_FAILURE} from '../actions/actionTypes'

const initialState = {
  items: [],
  loading: false,
  error: null,
};

export default function itemListReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ITEMS_REQUEST: {
     return {...state, loading: true, error: null};
    }
    case FETCH_ITEMS_FAILURE: {
      const { error } = action.payload;
      return { ...state, loading: false, error};
    }
    case FETCH_ITEMS_SUCCESS: {
      const { items } = action.payload;
      return { ...state, items, loading: false, error: null};
    }
    default:
      return state;
      
  }
}