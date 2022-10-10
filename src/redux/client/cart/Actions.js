import AxiosUser from "../../../apis/client/AxiosUser"
import ToastError from "../../../components/client/ToastError"
import ToastSuccess from "../../../components/client/ToastSuccess"
import { KEY_USER } from "../../../constant/LocalStored";
import { ADD_CART, DECREASE_QUANLITY, DELETE_CART, DID_MOUT_FETCH_CART, FETCH_CART, INCREASE_QUANLITY } from "./Types"
const idUser = localStorage.getItem(KEY_USER) && JSON.parse(localStorage.getItem(KEY_USER))._id 

export const fetchCart = (data) => {
    return {
        type : FETCH_CART,
        payload : data
    }
}
export const increaseQuanlity = (data) => {
    return {
        type : INCREASE_QUANLITY,
        payload : data
    }
}
export const decreaseQuanlity = (data) => {
    return {
        type : DECREASE_QUANLITY,
        payload : data
    }
}
export const deleteCart = (data) => {
    return {
        type  : DELETE_CART,
        payload : data
    }
}
export const addCart = (data) => {
    return {
        type  : ADD_CART,
        payload : data
    }
}
export const fetchDeleteCartRequest = (data) => {
    return (dispatch) => {
        (async ()=>{
            try {
               await AxiosUser.post('/api/carts/delete',data).then(res => {ToastSuccess("Delete Success!");dispatch(deleteCart(data))}).catch(err => ToastError(err.response.data.message))
            } catch (error) {
                console.log(error);
            }
        })()
    }
    
}