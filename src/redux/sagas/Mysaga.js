import { call, put, takeEvery } from 'redux-saga/effects'
import { userApi } from '../../apis/usersApi';
import { KEY_USER } from '../../constant/LocalStored';
import { STATUS_CODE } from '../../constant/StatusCode';
export const fetchCancelOrderRequest = (user) => {
  return {
    type : "REMOVE_LIST_ORDER_REQUEST",
    payload : user
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
function* mySaga() {
  yield takeEvery("REMOVE_LIST_ORDER_REQUEST", fetchCancelOrder)
}

export default mySaga;