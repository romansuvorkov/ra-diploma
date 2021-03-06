import {FETCH_CATALOG_ITEM_REQUEST, FETCH_CATALOG_ITEM_SUCCESS, FETCH_CATALOG_ITEM_FAILURE} from '../actions/actionTypes'

const initialState = {
  itemInfo: [],
  itemInfoLoading: false,
  itemInfoError: null,

  itemImages: [],
  itemsizes: []
};

export default function itemListReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CATALOG_ITEM_REQUEST: {
     return {...state, itemInfoLoading: true, itemInfoError: null};
    }
    case FETCH_CATALOG_ITEM_FAILURE: {
      const { itemInfoError } = action.payload;
      return { ...state, itemInfoLoading: false, itemInfoError};
    }
    case FETCH_CATALOG_ITEM_SUCCESS: {
      const { itemInfo } = action.payload;
      const { images, sizes } = itemInfo;
      return { ...state, itemInfo: itemInfo, itemInfoLoading: false, itemInfoError: null, itemImages: images, itemsizes: sizes };        
    }
    default:
      return state;
  }
}