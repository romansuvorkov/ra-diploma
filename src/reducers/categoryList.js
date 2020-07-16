import {FETCH_CATEGORY_REQUEST, FETCH_CATEGORY_SUCCESS, FETCH_CATEGORY_FAILURE, SET_ACTIVE_CATEGORY} from '../actions/actionTypes';

const initialState = {
  categories: [{id: 999, title: "Все"}],
  categoryLoading: false,
  categoryError: null,
  activeCategoryID: 999
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
      return { ...state, categories: [{id: 999, title: "Все"}, ...categories], categoryLoading: false, categoryError: null};
    }
    case SET_ACTIVE_CATEGORY: {
      const { activeCategoryID } = action.payload;
      return { ...state, activeCategoryID: activeCategoryID};
    }
    default:
      return state;
  }
}
