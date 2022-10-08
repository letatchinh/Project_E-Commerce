import axios from 'axios';
import { call, put, take, takeEvery, takeLatest } from 'redux-saga/effects'
import AxiosUser from '../../apis/client/AxiosUser';
import { userApi } from '../../apis/usersApi';
import { KEY_USER } from '../../constant/LocalStored';
import { STATUS_CODE } from '../../constant/StatusCode';
import { fetchCart } from '../client/cart/Actions';
import { FILTER_LIST } from '../filterProduct/Types';
export const fetchCancelOrderRequest = (user) => {
  return {
    type : "REMOVE_LIST_ORDER_REQUEST",
    payload : user
  }
}
export const fetchFilterPriceRequest = (action) =>{
  return{
    type : "FETCH_FILTER_PRICE",
    payload : action
  }
}
export const fetchLoginRequest = (action) => {
  return{
    type : "LOGIN_REQUEST",
    payload : action
  }
}
export function* fetchCancelOrder(action) {
   try {
    const response =  yield call(userApi.editUser,action.payload,action.payload.id)
    const {status,data} = response
    if(status === STATUS_CODE.SUCCESS){
      localStorage.setItem(KEY_USER,JSON.stringify(data))
      yield put({type: "REMOVE_LIST_ORDER", payload: data})
    }
    else {
      yield put({type: "REMOVE_LIST_ORDER_FAILED", payload: data})
    }
  
   } catch (e) {
      yield put({type: "USER_FETCH_FAILED", message: e.message})
   }
}
export  function* fetchFilterPrice(action){
  yield put({type: action.payload, payload: ''})
  yield put({type: FILTER_LIST, payload: ''})
}
// export function* fetchLogin(action){
//   try {
//     const response =   yield call(AxiosUser.post('/api/users/loginUser/'),action.payload)
//     const {status,data} = response
//     if(status === STATUS_CODE.SUCCESS){
//       console.log(response);
//       // localStorage.setItem(KEY_USER,JSON.stringify(data))
//       // yield put({type: "REMOVE_LIST_ORDER", payload: data})
//     }
//     else {
//       // yield put({type: "REMOVE_LIST_ORDER_FAILED", payload: data})
//     }
  
//    } catch (e) {
//       // yield put({type: "USER_FETCH_FAILED", message: e.message})
//    }
// }
function* mySaga() {
  // if (localStorage.getItem(KEY_USER)) {
  //   const idUser = JSON.parse(localStorage.getItem(KEY_USER))._id;
  //    const response = yield call(AxiosUser.get(`/api/carts/filterCarts/`),idUser)
  //     const {status,data} = response
  //     console.log(response);
  //   // .then( (res) => {
  //   //   const newAr = res.data.map(e => ({...e,quanlity : 1}))
  //   //   put(fetchCart(newAr))
  //   // })
  //   // .catch((err) => console.log(err))) 
  // }
  // else {
  //   console.log("ok");
  // }
  
  yield takeEvery("REMOVE_LIST_ORDER_REQUEST", fetchCancelOrder)
  yield takeEvery("FETCH_FILTER_PRICE", fetchFilterPrice)
  // yield takeLatest("LOGIN_REQUEST", fetchLogin)
}

export default mySaga;