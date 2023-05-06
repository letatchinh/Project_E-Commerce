import AxiosUser from "../../../apis/client/AxiosUser";
import ToastError from "../../../components/client/ToastError";
import ToastSuccess from "../../../components/client/ToastSuccess";
import { KEY_USER } from "../../../constant/LocalStored";
import { fetchCartRequest } from "../../sagas/Mysaga";
import {
  ADD_CART,
  CAL_TOTAL_BILL,
  DECREASE_QUANLITY,
  DELETE_CART,
  FETCH_CART,
  INCREASE_QUANLITY,
  CHECKED_ALL_PRODUCT,
  FETCH_CART_NEW,
  CAL_VOUCHER
} from "./Types";


export const fetchCart = (data) => {
  return {
    type: FETCH_CART,
    payload: data,
  };
};
export const fetchCartNew = (data) => {
  return {
    type: FETCH_CART_NEW,
    payload: data,
  };
};
export const fetchTotalBill = () => {
  return {
    type: CAL_TOTAL_BILL,
    payload: "",
  };
};
export const fetchTaxShip = (action) => {
  return {
    type: "FETCH_TAX_SHIP",
    payload: action,
  };
};
export const fetchVoucher = (action) => {
  return {
    type: CAL_VOUCHER,
    payload: action,
  };
};
export const fetchCodeVoucher = (action) => {
  return {
    type: "FETCH_CODEVOUCHER",
    payload: action,
  };
};
export const fetchSubAddress = (action) => {
  return {
    type: "FETCH_SUBADDRESS",
    payload: action,
  };
};
export const increaseQuanlity = (data) => {
  return {
    type: INCREASE_QUANLITY,
    payload: data,
  };
};
export const decreaseQuanlity = (data) => {
  return {
    type: DECREASE_QUANLITY,
    payload: data,
  };
};
export const addCart = (data) => {
  return {
    type: ADD_CART,
    payload: data,
  };
};
export const checkedAllProductRequest = (action) => {
  return {
    type : CHECKED_ALL_PRODUCT,
    payload : action
  }
}

export const fetchDeleteCartRequest = (data) => {
  return (dispatch) => {
    (async () => {
      try {
        await AxiosUser.post("/api/carts/delete", data)
          .then(async(res) => {
            ToastSuccess("Xoá thành công!");
            dispatch(fetchCartRequest())
          })
          .catch((err) => ToastError(err.response.data.message));
      } catch (error) {
        console.log(error);
      }
    })();
  };
};
