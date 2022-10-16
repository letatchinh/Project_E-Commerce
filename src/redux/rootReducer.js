import {
  orderDeliveredReducer,
  orderDetailsReducer,
  orderListFiterNameReducer,
  orderListPaidSReducer,
  orderListReducer,
} from "./admin/Reducers/OrderReducers";
import {
  productCreateReducer,
  productDeleteReducer,
  productEditReducer,
  productListAllReducer,
  productListReducer,
  productUpdateReducer,
} from "./admin/Reducers/ProductReducers";
import {
  userDisabledReducer,
  userListReducer,
  userLoginReducer,
} from "./admin/Reducers/userReducers";
import cartReducers from "./client/cart/Reducers";
import MyColorCommonReducer from "./Common/Color";
import filterProductReducer from "./filterProduct/Reducers";
import userReducer from "./login/Reducers";

const { combineReducers } = require("redux");

const rootReducer = combineReducers({
  //user
  colorCommon: MyColorCommonReducer,
  user: userReducer,
  filterProduct: filterProductReducer,
  cart: cartReducers,
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
  productsListAll: productListAllReducer,
  orderListFiterName: orderListFiterNameReducer,
  orderListPaidS: orderListPaidSReducer,
  userDisabled: userDisabledReducer,
});

export default rootReducer;
