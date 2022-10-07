import {
  orderDeliveredReducer,
  orderDetailsReducer,
  orderListReducer,
} from "./admin/Reducers/OrderReducers";
import {
  productCreateReducer,
  productDeleteReducer,
  productEditReducer,
  productListReducer,
  productUpdateReducer,
} from "./admin/Reducers/ProductReducers";
import {
  userListReducer,
  userLoginReducer,
} from "./admin/Reducers/userReducers";
import commonReducer from "./Common/Color";
import filterProductReducer from "./filterProduct/Reducers";
import userReducer from "./login/Reducers";
import shopReducer from "./shopping/Shopping-reducers";

const { combineReducers } = require("redux");

const rootReducer = combineReducers({
  //user
  common: commonReducer,
  shop: shopReducer,
  user: userReducer,
  filterProduct: filterProductReducer,

  //admin
  userLogin: userLoginReducer,
  userList: userListReducer,
  productList: productListReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productEdit: productEditReducer,
  productUpdate: productUpdateReducer,
  orderList: orderListReducer,
  orderDetail: orderDetailsReducer,
  orderDelivered: orderDeliveredReducer,
});

export default rootReducer;
