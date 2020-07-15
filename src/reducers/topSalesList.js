import {FETCH_TOPSALES_REQUEST, FETCH_TOPSALES_SUCCESS, FETCH_TOPSALES_FAILURE} from '../actions/actionTypes'

const initialState = {
  topSales: [],
  loading: false,
  error: null,
};

export default function topSalesListReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_TOPSALES_REQUEST: {
     return {...state, loading: true, error: null};
    }
    case FETCH_TOPSALES_FAILURE: {
      const { error } = action.payload;
      return { ...state, loading: false, error};
    }
    case FETCH_TOPSALES_SUCCESS: {
      const { topSales } = action.payload;
      return { ...state, topSales, loading: false, error: null};
    }
    default:
      return state;
  }
}
