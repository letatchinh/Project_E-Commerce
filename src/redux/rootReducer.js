import {
  userListReducer,
  userLoginReducer,
} from "./admin/Reducers/userReducers";
import filterProductReducer from "./filterProduct/Reducers";
import userReducer from "./login/Reducers";
import shopReducer from "./shopping/Shopping-reducers";

const { combineReducers } = require("redux");

const rootReducer = combineReducers({
  shop: shopReducer,
  user: userReducer,
  filterProduct: filterProductReducer,
  userLogin: userLoginReducer,
  userList: userListReducer,
});

export default rootReducer;
