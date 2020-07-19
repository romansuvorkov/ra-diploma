import {FETCH_SEARCH_REQUEST, FETCH_SEARCH_SUCCESS, FETCH_SEARCH_FAILURE, SET_SEARCH_TEXT} from '../actions/actionTypes';


const initialState = {
  searchText: '',
  searchLoading: false,
  searchError: null,
  searchResponse: []
};

export default function searchReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SEARCH_REQUEST: {
     return {...state, searchLoading: true, searchError: null};
    }
    case FETCH_SEARCH_FAILURE: {
      const { searchError } = action.payload;
      return { ...state, searchLoading: false, searchError: searchError};
    }
    case FETCH_SEARCH_SUCCESS: {
      const { searchResponse } = action.payload;
      return { ...state, searchResponse: searchResponse};
    }
    case SET_SEARCH_TEXT: {
      const { searchText } = action.payload;
      return { ...state, searchText: searchText};
    }
    default:
      return state;
  }
}
