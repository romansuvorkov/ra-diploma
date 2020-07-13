import { FETCH_ITEMS_REQUEST,
         FETCH_ITEMS_SUCCESS, 
         FETCH_ITEMS_FAILURE,
         FETCH_TOPSALES_REQUEST,
         FETCH_TOPSALES_SUCCESS,
         FETCH_TOPSALES_FAILURE
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

export const fetchItems = () => async (dispatch) => {
  dispatch(fetchItemsRequest());
  try {
      const response = await fetch(`${process.env.REACT_APP_DATA_URL}/items`);
      const items = await response.json();
      dispatch(fetchItemsSuccess(items));
  } catch (error) {
      dispatch(fetchItemsFailure(error.message));                
  }
}

export const fetchTopSalesRequest = () => ({
  type: FETCH_TOPSALES_REQUEST
});

export const fetchTopSalesSuccess = (items) => ({
  type: FETCH_TOPSALES_SUCCESS, payload: { items }
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