import axios from "axios";
import { call, put, take, takeEvery, takeLatest } from "redux-saga/effects";
import AxiosUser from "../../apis/client/AxiosUser";
import { userApi } from "../../apis/usersApi";
import ToastError from "../../components/client/ToastError";
import ToastSuccess from "../../components/client/ToastSuccess";
import { KEY_USER } from "../../constant/LocalStored";
import { STATUS_CODE } from "../../constant/StatusCode";
import { fetchCart } from "../client/cart/Actions";
import { FILTER_LIST } from "../filterProduct/Types";
export const fetchCancelOrderRequest = (user) => {
  return {
    type: "REMOVE_LIST_ORDER_REQUEST",
    payload: user,
  };
};
export const fetchCartRequest = () => {
  return {
    type : "FETCH_CART_REQUEST",
    payload : ''
  }
}
export const fetchAddOrderRequest = (action) => {
  return {
    type: "ADD_ORDER_REQUEST",
    payload: action,
  };
}
export const fetchListCheckedRequest = (action) => {
  return {
    type : "FETCH_LIST_CHECKED_REQUEST",
    payload : action
  }
}

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
 const response = yield call(() => AxiosUser.post("/api/carts/add",action.payload))
 const {status,data} = response
  if(status === STATUS_CODE.CREATED){
    yield put({ type: "FETCH_CART_SUCCESS", payload: data })
    yield ToastSuccess("Add Success!")
  }
  } catch (error) {
    ToastError(error.response.data.message)
  }
}
export function* fetchCartSuccess(){
  const idUser = JSON.parse(localStorage.getItem(KEY_USER))._id;
  try {
       const res = yield call(() => AxiosUser.get(`/api/carts/filterCarts/${idUser}`))
       const {status,data} = res
       if(status === STATUS_CODE.SUCCESS){
        const newAr = yield data.map(e => ({...e.product,quanlity : 1,isChecked : false}))
       yield put(fetchCart(newAr))
       }
     } catch (error) {
      ToastError(error.response.data.message)
     }
}
export function* fetchFilterPrice(action) {
  yield put({ type: action.payload, payload: "" });
  yield put({ type: FILTER_LIST, payload: "" });
}
export function* fetchListCheckedSaga(action){

}
export function* fetchAddOrder(action){
  try {
   const {status , data} = yield call(() => AxiosUser.post("/api/orders",action.payload.newOrder,action.payload.config))
   if(status === STATUS_CODE.CREATED){
    yield put({ type: "ADD_ORDER_SUCCESS", payload: data })
   }
  } catch (error) {
    console.log(error)
  }

}
export function* fetchAddOrderSuccessAndDeleteCart(action){
  const idUser = JSON.parse(localStorage.getItem(KEY_USER))._id;
  const listProduct = [];
  action.payload.orderItem.map(e => {
    listProduct.push(e.product)
  })
  try {
    
    const {status} = yield call(() => AxiosUser.post(`/api/carts/deleteMany/${idUser}`,listProduct))
    if(status === STATUS_CODE.SUCCESS){
      ToastSuccess("THANH CONG")
     yield put({type :"FETCH_CART_REQUEST"})
    }
  } catch (error) {
    console.log(error)
  }
}
export function* fetchCartSaga(){
  try {
    if (localStorage.getItem(KEY_USER)) {
      const idUser = JSON.parse(localStorage.getItem(KEY_USER))._id;
  const {status,data} =  yield call(() =>AxiosUser.get(`/api/carts/filterCarts/${idUser}`)) 
        if(status === STATUS_CODE.SUCCESS){
          const newArrOk =  data.filter(e => e.product !== null)
          const newArrFail =  data.filter(e => e.product === null)
          newArrFail.map(e => AxiosUser.delete(`/api/carts/deleteById/${e._id}`))
          const newAr =   newArrOk.map((e) => 
            ({
              ...e.product,
              quanlity: 1,
              isChecked : false,
            })
            
          );
         yield put(fetchCart(newAr));
        }
    }
  } catch (error) {
    console.log(error);
  }
}
function* mySaga() {
  yield takeLatest("FETCH_ADD_CART", fetchAddToCart);
  yield takeLatest("FETCH_CART_REQUEST", fetchCartSaga);
  yield takeLatest("FETCH_LIST_CHECKED_REQUEST", fetchListCheckedSaga);
  yield takeLatest("ADD_ORDER_REQUEST", fetchAddOrder);
  yield takeLatest("ADD_ORDER_SUCCESS", fetchAddOrderSuccessAndDeleteCart);
  yield takeEvery("FETCH_CART_SUCCESS", fetchCartSuccess);
  yield takeEvery("REMOVE_LIST_ORDER_REQUEST", fetchCancelOrder);
  yield takeEvery("FETCH_FILTER_PRICE", fetchFilterPrice);
}

export default mySaga;
