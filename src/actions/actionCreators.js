import { FETCH_ITEMS_REQUEST,
         FETCH_ITEMS_SUCCESS, 
         FETCH_ITEMS_FAILURE,
         FETCH_TOPSALES_REQUEST,
         FETCH_TOPSALES_SUCCESS,
         FETCH_TOPSALES_FAILURE,
         FETCH_CATEGORY_REQUEST, 
         FETCH_CATEGORY_SUCCESS, 
         FETCH_CATEGORY_FAILURE,
         SET_ACTIVE_CATEGORY,
         CLEAR_ITEMS,
         FETCH_SEARCH_REQUEST,
         FETCH_SEARCH_SUCCESS,
         FETCH_SEARCH_FAILURE,
         SET_SEARCH_TEXT,
         FETCH_CATALOG_ITEM_REQUEST,
         FETCH_CATALOG_ITEM_SUCCESS,
         FETCH_CATALOG_ITEM_FAILURE
        } from './actionTypes';

export const fetchItemsRequest = () => ({
  type: FETCH_ITEMS_REQUEST
});

export const fetchItemsSuccess = (items) => ({
  type: FETCH_ITEMS_SUCCESS, payload: { items }
});

export const fetchItemsFailure = (error) => ({
  type: FETCH_ITEMS_FAILURE, payload: { error}
});

export const clearItems = () => ({
  type: CLEAR_ITEMS
});

export const fetchItems = (address) => async (dispatch) => {
  dispatch(fetchItemsRequest());
  try {
    // console.log('fetchItems address');
    // console.log(address);
      const response = await fetch(`${process.env.REACT_APP_DATA_URL}${address}`);
      const items = await response.json();
      dispatch(fetchItemsSuccess(items));
  } catch (error) {
      dispatch(fetchItemsFailure(error.message));                
  }
}

export const fetchTopSalesRequest = () => ({
  type: FETCH_TOPSALES_REQUEST
});

export const fetchTopSalesSuccess = (topSales) => ({
  type: FETCH_TOPSALES_SUCCESS, payload: { topSales }
});

export const fetchTopSalesFailure = (error) => ({
  type: FETCH_TOPSALES_FAILURE, payload: { error}
});

export const fetchTopSales = () => async (dispatch) => {
  dispatch(fetchTopSalesRequest());
  try {
      const response = await fetch(`${process.env.REACT_APP_DATA_URL}/top-sales`);
      const topSales = await response.json();
      dispatch(fetchTopSalesSuccess(topSales));
  } catch (error) {
      dispatch(fetchTopSalesFailure(error.message));                
  }

}

export const fetchCategoriesRequest = () => ({
  type: FETCH_CATEGORY_REQUEST
});

export const fetchCategoriesSuccess = (categories) => ({
  type: FETCH_CATEGORY_SUCCESS, payload: { categories }
});

export const fetchCategoriesFailure = (categoryError) => ({
  type: FETCH_CATEGORY_FAILURE, payload: { categoryError}
});

export const setActiveCategory = (activeCategoryID) => ({
  type: SET_ACTIVE_CATEGORY, payload: { activeCategoryID }
});

export const fetchCategories = () => async (dispatch) => {
  dispatch(fetchCategoriesRequest());
  try {
      const response = await fetch(`${process.env.REACT_APP_DATA_URL}/categories`);
      const categories = await response.json();
      dispatch(fetchCategoriesSuccess(categories));
  } catch (error) {
      dispatch(fetchCategoriesFailure(error.message));                
  }
}


export const fetchSearchRequest = () => ({
  type: FETCH_SEARCH_REQUEST
});

export const fetchSearchSuccess = (searchResponse) => ({
  type: FETCH_SEARCH_SUCCESS, payload: { searchResponse }
});

export const fetchSearchFailure = (searchError) => ({
  type: FETCH_SEARCH_FAILURE, payload: { searchError}
});

export const setSearchText = (searchText) => ({
  type: SET_SEARCH_TEXT, payload: { searchText }
});

export const fetchSearch = (searchText) => async (dispatch) => {
  dispatch(fetchSearchRequest());
  try {
      const response = await fetch(`${process.env.REACT_APP_DATA_URL}/items?q=${searchText}`);
      const searchResponse = await response.json();
      dispatch(fetchSearchSuccess(searchResponse));
      dispatch(fetchItemsSuccess(searchResponse));
  } catch (error) {
      dispatch(fetchSearchFailure(error.message));                
  }
}

export const fetchCatalogItemRequest = () => ({
  type: FETCH_CATALOG_ITEM_REQUEST
});

export const fetchCatalogItemSuccess = (itemInfo) => ({
  type: FETCH_CATALOG_ITEM_SUCCESS, payload: { itemInfo }
});

export const fetchCatalogItemFailure = (itemInfoError) => ({
  type: FETCH_CATALOG_ITEM_FAILURE, payload: { itemInfoError}
});


export const fetchCatalogItem = (id) => async (dispatch) => {
  dispatch(fetchCatalogItemRequest());
  try {
      const response = await fetch(`${process.env.REACT_APP_DATA_URL}/items/${id}`);
      const itemInfo = await response.json();
      dispatch(fetchCatalogItemSuccess(itemInfo));
  } catch (error) {
      dispatch(fetchCatalogItemFailure(error.message));                
  }
}
