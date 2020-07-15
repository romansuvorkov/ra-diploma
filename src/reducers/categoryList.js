import {FETCH_CATEGORY_REQUEST, FETCH_CATEGORY_SUCCESS, FETCH_CATEGORY_FAILURE} from '../actions/actionTypes';

const initialState = {
  categories: [],
  categoryLoading: false,
  categoryError: null,
};

export default function categoryListReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CATEGORY_REQUEST: {
     return {...state, categoryLoading: true, categoryError: null};
    }
    case FETCH_CATEGORY_FAILURE: {
      const { categoryError } = action.payload;
      return { ...state, categoryLoading: false, categoryError};
    }
    case FETCH_CATEGORY_SUCCESS: {
      const { categories } = action.payload;
      {categories.push({id: 999, title: "Все"})}
      return { ...state, categories, categoryLoading: false, categoryError: null};
    }
    default:
      return state;
  }
}
