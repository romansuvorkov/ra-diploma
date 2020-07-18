import {FETCH_ITEMS_REQUEST, FETCH_ITEMS_SUCCESS, FETCH_ITEMS_FAILURE, CLEAR_ITEMS} from '../actions/actionTypes'

const initialState = {
  items: [],
  loading: false,
  error: null,
  itemsLength: 0,
  stopRequest: false
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
      if (items.length < 6) {
        return { ...state, items: [...state.items, ...items], loading: false, error: null, itemsLength: [...state.items, ...items].length, stopRequest: true};  
      } else {
        return { ...state, items: [...state.items, ...items], loading: false, error: null, itemsLength: [...state.items, ...items].length, stopRequest: false};        
      }

    }
    case CLEAR_ITEMS: {
      return { ...state, items: [], itemsLength: 0};
    }
    default:
      return state;
      
  }
}
