
import { userApi } from '../../apis/usersApi'
import { KEY_USER } from '../../constant/LocalStored'
import * as TYPES from './Types'
import {  toast } from 'react-toastify';
import axios from 'axios';
import userApis from '../../apis/client/usersApis';
import AxiosUser from '../../apis/client/AxiosUser';
import ToastError from '../../components/client/ToastError';
import ToastSuccess from '../../components/client/ToastSuccess';
export const changeText = (type,payload) => {
    return {
        type : type ,
        payload : payload
    }
}
export const fetchCheckLogin = (user) => {
    return {
        type : TYPES.CHECK_LOGIN , 
        payload : user
    }
}
export const fetchLoginRequest=(data) =>{
    return (dispatch) => {
        (async () => {
            try {
                const res = await AxiosUser.post('/api/users/loginUser',data)
                localStorage.setItem(KEY_USER,JSON.stringify(res.data));
                dispatch(fecthLogginSuccess(res.data))
                ToastSuccess("Login Success")
                return res.data
            } catch (error) {
                console.log(error.response.data.message);
                ToastError(error.response.data.message)
            }
        })()
    }
}

export const fectchLogin = (user) => {
    return {
        type : TYPES.LOGIN , 
        payload : user
    }
}
export const fectchLogout = () => {
    return {
        type : TYPES.LOGOUT ,
        payload : ""
    }
}
export const fecthUserRequest = () => {
    return (dispatch) => {
        (async () => {
            try {
                const res = await userApi.getAllUser()
                dispatch(fecthUser(res.data))
            } catch (error) {
                console.log(error);
            }
        })()
    }
}
export const fetchLogginSuccessRequest = () => {
    return (dispatch) => {
        ( async() => {
            try {
                const res = await JSON.parse(localStorage.getItem(KEY_USER))
                dispatch(fecthLogginSuccess(res))
            } catch (error) {
                console.log(error);
            }
        })()
    }
}
// export const fetchAddToCartRequest = (item) => {
//     return (dispatch) => {
//         ( async() => {
//             try {   
//                 const list = JSON.parse(localStorage.getItem(KEY_USER))
//                 const flag = list.listCarts.find(e => e.id === item.id)
//                if(!flag){
//                 const newList = {...list , listCarts : [...list.listCarts,{...item, quanlity : 1}]}
//                 localStorage.setItem(KEY_USER,JSON.stringify(newList));
//                 dispatch(fecthAddToCart(newList))
//                 userApi.editUser(newList,list.id)
//                 (toast('Add Cart Success!', {
//                     position: "top-center",
//                     autoClose: 2000,
//                     hideProgressBar: false,
//                     closeOnClick: true,
//                     draggable: true,
//                     progress: undefined,
//                     }))()
//                }
//                else{
//                 const newListCart = list.listCarts.map(e => {
//                     if(e.id === item.id){
//                         e.quanlity++
//                     }
//                     return e
//                 })
//                 const newList = {...list,listCarts : newListCart}
//                 localStorage.setItem(KEY_USER,JSON.stringify(newList));
//                 dispatch(fecthAddToCart(newList))
//                 userApi.editUser(newList,list.id)
//                 (toast('Add Cart Success!', {
//                     position: "top-center",
//                     autoClose: 2000,
//                     hideProgressBar: false,
//                     closeOnClick: true,
//                     draggable: true,
//                     progress: undefined,
//                     }))()
//                }
               
//             } catch (error) {
//                 console.log(error);
//             }
//         })()
//     }
// }


export const featchRemoveItemCartRequest = (item) => {
    return (dispatch) => {
        (async ()=>{
            try {
                const list = JSON.parse(localStorage.getItem(KEY_USER))
                list.listCarts = list.listCarts.filter(e => e.id !== item.id)
                localStorage.setItem(KEY_USER,JSON.stringify(list));
                dispatch(fecthRemoveItemCart(list))
                userApi.editUser(list,list.id)
            } catch (error) {
                console.log(error);
            }
        })()
    }
}
export const featchIncreaseItemRequest = (item) => {
    return (dispatch) => {
        (async () => {
            try {
                const list = JSON.parse(localStorage.getItem(KEY_USER))
                list.listCarts.map(e => {
                    if(e.id === item.id){
                        e.quanlity++;
                    }
                    return e
                })
                localStorage.setItem(KEY_USER,JSON.stringify(list))
                dispatch(fecthIncreaseItemCart(list))
                userApi.editUser(list,list.id)
            } catch (error) {
                console.log(error);
            }
        })()
    }
}
export const fecthIncreaseItemCart = (user) => {
    return {
        type : TYPES.INCREASE_ITEM_CART ,
        payload : user
    }
}
export const featchDecreaseItemRequest = (item) => {
    return (dispatch) => {
        (async () => {
            try {
                const list = JSON.parse(localStorage.getItem(KEY_USER))
                list.listCarts.map(e => {
                    if(e.id === item.id){
                        e.quanlity--;
                    }
                    return e
                })
                localStorage.setItem(KEY_USER,JSON.stringify(list))
                dispatch(fecthDecreaseItemCart(list))
                userApi.editUser(list,list.id)
            } catch (error) {
                console.log(error);
            }
        })()
    }
}

export const fecthDecreaseItemCart = (user) => {
    return {
        type : TYPES.DECREASE_ITEM_CART ,
        payload : user
    }
}
export const fecthRemoveItemCart = (user) => {
    return {
        type : TYPES.REMOVE_ITEM_CART ,
        payload : user
    }
}
export const fecthAddToCart = (user) => {
    return {
        type : TYPES.ADD_TO_CART ,
        payload : user
    }
}
export const fecthLogginSuccess= (user) => {
    return {
        type : TYPES.FETCH_LOGINSUCCESS ,
        payload : user
    }
}
export const fecthUser = (user) => {
    return {
        type : TYPES.FETCH_USER ,
        payload : user
    }
}
export const fetchRegisterRequest = (user) => {
    return (dispatch)=>{
        (()=>{
            try {   
                //  userApi.addUser(user)
                axios.post(`/api/users/`,user)
                // dispatch(fetchRegister(user))

            } catch (error) {
                console.log(error);
            }
        })()
    }
}
export const fetchRegister = (user) => {
    return {
        type : TYPES.REGISTER,
        payload : user
    }
}
export const fetchEditUserRequest = (user) => {
    return (dispatch) => {
        (async ()=>{
            try {
                await userApi.editUser(user,user.id)
                localStorage.setItem(KEY_USER,JSON.stringify(user))
                dispatch(fecthEditUser(user))
            } catch (error) {
                
            }
        })()
    }
}
export const fecthEditUser = (user) => {
return {
    type : TYPES.EDIT_USER,
    payload : user
}
}
export const fecthAddListPaymentChecked = (list) => {
    return {
        type : TYPES.ADD_LIST_PAYMENT_CHECKED,
        payload : list
    } }
export const fecthRemoveListPaymentChecked = (list) => {
    return {
        type : TYPES.REMOVE_LIST_PAYMENT_CHECKED,
        payload : list
    } }
export const fetchAddListOrderRequest = (user) => {
    return (dispatch) => {
        (async ()=>{
            try {
                await userApi.editUser(user,user.id)
                localStorage.setItem(KEY_USER,JSON.stringify(user))
                dispatch(fetchAddListOrder(user))
            } catch (error) {
                console.log(error);
            }
        })()
    }
}
export const fetchAddListOrder = (user) => {
    return {
        type : TYPES.ADD_LIST_ORDER,
        payload : user
    }
}