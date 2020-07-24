import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import itemListReducer from '../reducers/itemList';
import topSalesListReducer from '../reducers/topSalesList';
import categoryListReducer from '../reducers/categoryList';
import searchReducer from '../reducers/searchReducer';
import itemInfo from '../reducers/itemInfo';
import cartReducer from '../reducers/cartList';
import orderReducer from '../reducers/orderReducer';
import ReduxThunk from 'redux-thunk';


const reducer = combineReducers({
  itemList: itemListReducer,
  topSalesList: topSalesListReducer,
  categoryList: categoryListReducer,
  searchReducer: searchReducer,
  itemInfo: itemInfo,
  cart: cartReducer,
  orderReducer: orderReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(
    applyMiddleware(ReduxThunk),
));

export default store;
