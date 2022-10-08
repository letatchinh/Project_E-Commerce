import AxiosUser from "../../../apis/client/AxiosUser"
import ToastError from "../../../components/client/ToastError"
import ToastSuccess from "../../../components/client/ToastSuccess"
import { DID_MOUT_FETCH_CART, FETCH_CART } from "./Types"

export const fetchCart = (data) => {
    return {
        type : FETCH_CART,
        payload : data
    }
}
export const didMoutfetchCart = () => {
    return {
        type : DID_MOUT_FETCH_CART,
        payload : ''
    }
}
export const fetchAddToCartRequest = (data) => {
    // AxiosUser.post(``)
    return (dispatch) => {
        (async ()=>{
            try {
                AxiosUser.post('/api/carts/add',data).then(res => ToastSuccess("Add Success!")).catch(err => ToastError(err.response.data.message))
            } catch (error) {
                console.log(error);
            }
        })()
    }
    
}
export const fetchDeleteCartRequest = (data) => {
    // AxiosUser.post(``)
    return (dispatch) => {
        (async ()=>{
            try {
                console.log(data);
                
                AxiosUser.delete('/api/carts/delete',data).then(res => ToastSuccess("Delete Success!")).catch(err => ToastError(err.response.data.message))
            } catch (error) {
                console.log(error);
            }
        })()
    }
    
}