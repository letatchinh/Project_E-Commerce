import filterProductReducer from './filterProduct/Reducers';
import userReducer from './login/Reducers';
import shopReducer from './shopping/Shopping-reducers';

const { combineReducers } = require('redux');

const rootReducer = combineReducers({
  shop: shopReducer,
  user : userReducer,
  filterProduct : filterProductReducer

});

export default rootReducer;