import { all, call, delay, put, select,  takeEvery, takeLatest } from "redux-saga/effects";
import AxiosUser from "../../apis/client/AxiosUser";
import { userApi } from "../../apis/usersApi";
import ToastError from "../../components/client/ToastError";
import ToastSuccess from "../../components/client/ToastSuccess";
import { KEY_USER } from "../../constant/LocalStored";
import { STATUS_CODE } from "../../constant/StatusCode";
import { fetchCart, fetchVoucher } from "../client/cart/Actions";
import { FILTER_LIST } from "../filterProduct/Types";
import { fecthLogginSuccess } from "../login/Actions";
export const fetchCancelOrderRequest = (user) => {
  return {
    type: "REMOVE_LIST_ORDER_REQUEST",
    payload: user,
  };
};
export const fetchCartRequest = () => {
  return {
    type: "FETCH_CART_REQUEST",
    payload: "",
  };
};
export const fetchLoginWithGoogleAndFbRequest = (action) => {
  return {
    type: "FETCH_LOGIN_WITH_GG_AND_FB_REQUEST",
    payload: action,
  };
};
export const fetchDeleteAllCartRequest = () => {
  return {
    type: "FETCH_DELETE_ALL_CART_REQUEST",
    payload: "",
  };
};
export const fetchAddCommentRequest = (action) => {
  return {
    type: "FETCH_ADD_COMMENT_REQUEST",
    payload: action,
  };
};
// export const fetchListReviewRequest = (action) => {
//   return{
//     type : "FETCH_REVIEW_REQUEST",
//     payload : action
//   }
// }
export const fetchAddOrderRequest = (action) => {
  return {
    type: "ADD_ORDER_REQUEST",
    payload: action,
  };
};
export const fetchRemoveVoucherRequest = (action) => {
  return {
    type: "REMOVE_VOUCHER",
    payload: action,
  };
};
export const fetchListCheckedRequest = (action) => {
  return {
    type: "FETCH_LIST_CHECKED_REQUEST",
    payload: action,
  };
};
export const fetchSearchOnkeyUpRequest = (action) => {
  return{
    type : "FETCH_SEARCH_ONKEYUP_REQUEST",
    payload : action
  }
}
export const fetchApplyVoucherRequest = (action) => {
  return {
    type: "FETCH_APPLY_VOUCHER_REQUEST",
    payload: action,
  };
};
export const fetchFilterPriceRequest = (action) => {
  return {
    type: "FETCH_FILTER_PRICE",
    payload: action,
  };
};
export const fetchLoginRequest = (action) => {
  return {
    type: "LOGIN_REQUEST",
    payload: action,
  };
};
export const fetchCheckVoucherRequest = (action) => {
  return {
    type: "FETCH_CHECK_VOUCHER_REQUEST",
    payload: action,
  };
};
export const fetchAddVoucherRequest = (action) => {
  return {
    type: "ADD_VOUCHER_REQUEST",
    payload: action,
  };
};
export const fetchAddToCartRequestSaga = (action) => {
  return {
    type: "FETCH_ADD_CART",
    payload: action,
  };
};
export function* fetchCancelOrder(action) {
  try {
    const response = yield call(
      userApi.editUser,
      action.payload,
      action.payload.id
    );
    const { status, data } = response;
    if (status === STATUS_CODE.SUCCESS) {
      localStorage.setItem(KEY_USER, JSON.stringify(data));
      yield put({ type: "REMOVE_LIST_ORDER", payload: data });
    } else {
      yield put({ type: "REMOVE_LIST_ORDER_FAILED", payload: data });
    }
  } catch (e) {
    yield put({ type: "USER_FETCH_FAILED", message: e.message });
  }
}
export function* fetchAddToCart(action) {
  try {
    const response = yield call(() =>
      AxiosUser.post("/api/carts/add", action.payload.itemCart)
    );
    const { status, data } = response;
    if (status === STATUS_CODE.CREATED) {
      yield put({ type: "FETCH_CART_SUCCESS", payload: data });
      yield ToastSuccess("Đã thêm vào giỏ hàng!");
      if(action.payload.setLoading){
        action.payload.setLoading()
      }
    }
    else{
      if(action.payload.setLoading){
        action.payload.setLoading()
      }
    }
  } catch (error) {
    ToastError(error.response.data.message);
    if(action.payload.setLoading){
      action.payload.setLoading()
    }
  }
}
export function* fetchCartSuccess() {
  const idUser = JSON.parse(localStorage.getItem(KEY_USER))._id;
  try {
    const res = yield call(() =>
      AxiosUser.get(`/api/carts/filterCarts/${idUser}`)
    );
    const { status, data } = res;
    if (status === STATUS_CODE.SUCCESS) {
      const allCarts = yield data.allCarts.map((e) => ({
        ...e.product,
        quanlity: 1,
        isChecked: false,
      }));
      const carts = yield data.carts.map((e) => ({ ...e.product }));
      yield put(
        fetchCart({ cart: carts, allCarts: allCarts, count: data.count })
      );
    }
  } catch (error) {
    ToastError(error.response.data.message);
  }
}
export function* fetchFilterPrice(action) {
  yield put({ type: action.payload, payload: "" });
  yield put({ type: FILTER_LIST, payload: "" });
}
export function* fetchListCheckedSaga(action) {}
export function* fetchAddOrder(action) {
  try {
    const { status, data } = yield call(() =>
      AxiosUser.post(
        "/api/orders/create",
        action.payload.newOrder,
        action.payload.config
      )
    );
    if (status === STATUS_CODE.CREATED) {
      const getVoucher = (state) => state.cart.CodeVoucher
      let Voucher = yield select(getVoucher)
      yield put({ type: "ADD_ORDER_SUCCESS", payload: data });
      yield all(data.orderItem.map(e => call(() => AxiosUser.put("/api/products/updateProduct",e))))
      yield put(fetchRemoveVoucherRequest(Voucher))
      yield action.payload.setStep()
    }
  } catch (error) {
    ToastError("Mua hàng thất bại")
  }
}
export function* fetchAddOrderSuccessAndDeleteCart(action) {
  const idUser = JSON.parse(localStorage.getItem(KEY_USER))._id;
  const listProduct = [];
  action.payload.orderItem.map((e) => {
    listProduct.push(e.product);
  });
  try {
    const { status } = yield call(() =>
      AxiosUser.post(`/api/carts/deleteMany/${idUser}`, listProduct)
    );
    if (status === STATUS_CODE.SUCCESS) {
      ToastSuccess("Thanh toán thành công");
      yield put({ type: "FETCH_CART_REQUEST" });
    }
  } catch (error) {
    console.log(error);
  }
}
export function* fetchCartSaga() {
  try {
    if (localStorage.getItem(KEY_USER)) {
      const idUser = JSON.parse(localStorage.getItem(KEY_USER)) || "";
      const { status, data } = yield call(() =>
        AxiosUser.get(`/api/carts/filterCarts/${idUser._id}`)
      );
      if (status === STATUS_CODE.SUCCESS) {
        const newArrOk = data.allCarts.filter((e) => e.product !== null);
        const newArrFail = data.allCarts.filter((e) => e.product === null);
        newArrFail.map((e) =>
          AxiosUser.delete(`/api/carts/deleteById/${e._id}`)
        );
        const newAr = newArrOk.map((e) => ({
          ...e.product,
          quanlity: 1,
          isChecked: false,
        }));
        const listCartHome = data.carts.map((e) => ({
          ...e.product,
        }));
        yield put(
          fetchCart({ cart: listCartHome, count: data.count, allCarts: newAr })
        );
      }
    } else {
      yield put(fetchCart({ cart: [], count: 0, allCarts: [] }));
    }
  } catch (error) {
    console.log(error);
    return []
  }
}
export function* fetchLoginWithGgAndFb(action) {
  try {
    const res = yield call(() =>
      AxiosUser.post(`/api/users/check`, action.payload)
    );
    if (res.status === STATUS_CODE.SUCCESS) {
      yield localStorage.setItem(KEY_USER, JSON.stringify(res.data));
      yield put(fecthLogginSuccess(res.data));
      ToastSuccess("Đăng nhập thành công");
    }
    else if(res.status === STATUS_CODE.CREATED){
      yield localStorage.setItem(KEY_USER, JSON.stringify(res.data));
      yield put(fecthLogginSuccess(res.data));
      ToastSuccess("Đăng nhập thành công");
    }
    else{
      ToastError("Đăng nhập thất bại");
    }
  } catch (error) {
    ToastError(error.response.data.message)
  }
}
export function* fetchDeleteAllCart(){
  try {
    const user =  JSON.parse(localStorage.getItem(KEY_USER)) || "";
    const res = yield call(() => AxiosUser.post(`/api/carts/deleteAll/${user._id}`))
    if(res.status === STATUS_CODE.SUCCESS){
      yield ToastSuccess("Xoá giỏ hàng thành công")
      yield put({type : "FETCH_CART_REQUEST",payload : ""})
    }
    else{
      ToastError("Xoá giỏ hàng thất bại")
    }
  } catch (error) {
    console.log(error);
  }
}
export function* fetchAddVoucher(action){
  try {
    console.log(action);
    const user =  JSON.parse(localStorage.getItem(KEY_USER)) || "";
    const res = yield call(() => AxiosUser.put(`/api/users/addVoucher/${user._id}`,action.payload.voucher))
    if(res.status === STATUS_CODE.SUCCESS){
      action.payload.setLoading()
      yield ToastSuccess("Lấy voucher thành công")
    }
    else{
      action.payload.setLoading()
      ToastError("Lấy voucher thất bại")
    }
  } catch (error) {
    action.payload.setLoading()
    ToastError(error.response.data.message)
  }
}
export function* fetchRemoveVoucher(action){
  try {
    const user =  JSON.parse(localStorage.getItem(KEY_USER)) || "";
    const res = yield call(() => AxiosUser.put(`/api/users/removeVoucher/${user._id}`,{IdnewVoucher :action.payload}))
    if(res.status === STATUS_CODE.SUCCESS){
      // yield ToastSuccess("Xoá voucher thành công")
      yield put(fetchVoucher({discount : 0,_id : null}))
    }
    else{
      // ToastError("Xoá voucher thất bại")
    }
  } catch (error) {
    console.log(error);
  }
}

export function* fetchApplyVoucher(action){
  try {
    yield put(fetchCheckVoucherRequest({discount : action.payload.discount,_id : action.payload._id,handleSetActive : action.payload.handleSetActive}))
  } catch (error) {
    console.log(error);
  }
}
export function* fetchCheckVoucher(action){
  const taxShip = (state) => state.cart.taxShip
  const totalBill = (state) => state.cart.totalBill
  try {
    const TotalBill = yield select(totalBill)
    const TaxShip = yield select(taxShip)
    if(action.payload.discount < TotalBill + TaxShip){
      yield put(fetchVoucher({discount : action.payload.discount,_id : action.payload._id}))
        yield action.payload.handleSetActive()
    }
    else{
      ToastError("Không thể sử dụng voucher này")
    }
  } catch (error) {
    
  }
}
export function* fetchSearchOnkeyUp(action){
  try {
    yield delay(500)
  const res =  yield call(() => AxiosUser.get(`/api/products/searchOnKeyUp?name=${action.payload.value}`))
     if(action.payload.func){
      yield action.payload.func(res.data.products)
    }
     if(action.payload.funcLoading){
      yield action.payload.funcLoading(false)
    }
  } catch (error) {
    
  }
}
export function* fetchAddComment(action){
  try {
    const {status} = yield call(() =>  AxiosUser.post("/api/reviews/add", action.payload.newComment))
   if(status === STATUS_CODE.CREATED){
     const {status,data} = yield call(() => AxiosUser.get(`/api/reviews/SumReviewByIdProduct/${action.payload._id}`))
     if(status === STATUS_CODE.SUCCESS){
     yield  action.payload.handleSetItem(data.updatedProduct)
     yield action.payload.setCount()
     yield action.payload.reset()
     yield ToastSuccess("Cảm ơn bạn đã đánh giá <3")
     }
   }
  } catch (error) {
    ToastError("Kết nối thất bại")
    console.log(error,"error");
  }
}
function* mySaga() {
  yield takeLatest("FETCH_ADD_CART", fetchAddToCart);
  yield takeLatest("FETCH_CART_REQUEST", fetchCartSaga);
  yield takeLatest("FETCH_LIST_CHECKED_REQUEST", fetchListCheckedSaga);
  yield takeLatest("FETCH_DELETE_ALL_CART_REQUEST", fetchDeleteAllCart);
  // yield takeLatest("FETCH_REVIEW_REQUEST", fetchListReviewSaga);
  yield takeLatest("ADD_ORDER_REQUEST", fetchAddOrder);
  yield takeLatest("FETCH_CHECK_VOUCHER_REQUEST", fetchCheckVoucher);
  yield takeLatest("FETCH_LOGIN_WITH_GG_AND_FB_REQUEST", fetchLoginWithGgAndFb);
  yield takeLatest("FETCH_APPLY_VOUCHER_REQUEST", fetchApplyVoucher);
  yield takeLatest("ADD_ORDER_SUCCESS", fetchAddOrderSuccessAndDeleteCart);
  yield takeLatest("ADD_VOUCHER_REQUEST", fetchAddVoucher);
  yield takeLatest("FETCH_ADD_COMMENT_REQUEST", fetchAddComment);
  yield takeLatest("REMOVE_VOUCHER", fetchRemoveVoucher);
  yield takeLatest("FETCH_SEARCH_ONKEYUP_REQUEST", fetchSearchOnkeyUp);
  yield takeEvery("FETCH_CART_SUCCESS", fetchCartSuccess);
  yield takeEvery("REMOVE_LIST_ORDER_REQUEST", fetchCancelOrder);
  yield takeEvery("FETCH_FILTER_PRICE", fetchFilterPrice);
}

export default mySaga;
