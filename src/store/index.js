import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import itemListReducer from '../reducers/itemList';
import topSalesListReducer from '../reducers/topSalesList';
import ReduxThunk from 'redux-thunk';


const reducer = combineReducers({
  itemList: itemListReducer,
  topSalesList: topSalesListReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(
    applyMiddleware(ReduxThunk),
));

export default store;
