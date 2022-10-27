import {
  categoryCreateReducer,
  categoryEditReducer,
  categoryListReducer,
  categoryUpdateReducer,
} from "./admin/Reducers/CategoryReducers";
import {
  orderDeliveredReducer,
  orderDetailsReducer,
  orderListFiterNameReducer,
  orderListNopaginationReducer,
  orderListPaidSReducer,
  orderListReducer,
  orderNoticeReducer,
} from "./admin/Reducers/OrderReducers";
import {
  productCreateReducer,
  productDeleteReducer,
  productEditReducer,
  productListAllReducer,
  productListReducer,
  productListSellerReducer,
  productUpdateReducer,
} from "./admin/Reducers/ProductReducers";
import {
  reviewActiveReducer,
  reviewDeleteReducer,
  reviewDisabledReducer,
  reviewListReducer,
} from "./admin/Reducers/ReviewReducers";
import {
  userActiveSReducer,
  userDisabledReducer,
  userListReducer,
  userLoginReducer,
  userOpenActiveReducer,
  userSendMailReducer,
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
  userActive: userActiveSReducer,
  userSendMail: userSendMailReducer,
  userOpenActive: userOpenActiveReducer,
  orderNotice: orderNoticeReducer,
  orderListNopagination: orderListNopaginationReducer,
  productListSellersa: productListSellerReducer,
  categoryList: categoryListReducer,
  categoryCreate: categoryCreateReducer,
  categoryEdit: categoryEditReducer,
  categoryUpdate: categoryUpdateReducer,
  reviewList: reviewListReducer,
  reviewDelete: reviewDeleteReducer,
  reviewDisabled: reviewDisabledReducer,
  reviewActive: reviewActiveReducer,
});

export default rootReducer;
