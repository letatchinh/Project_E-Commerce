import axios from "axios";
import { boolean, number } from "yup";
import {
  ORDER_DELIVERED_FAIL,
  ORDER_DELIVERED_REQUEST,
  ORDER_DELIVERED_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_LISTFILTERNAME_FAIL,
  ORDER_LISTFILTERNAME_REQUEST,
  ORDER_LISTFILTERNAME_SUCCESS,
  ORDER_LISTFILTERPAID_FAIL,
  ORDER_LISTFILTERPAID_REQUEST,
  ORDER_LISTFILTERPAID_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
} from "../Constants/OrderContants";
import { ADMIN_TOKEN } from "../Constants/token";
import { logout } from "./UserActions";

//ALL ORDER
export const listOrders =
  (keyword = "", pageNumber = "") =>
  async (dispatch, getState) => {
    const token = ADMIN_TOKEN;

    try {
      await dispatch({ type: ORDER_LIST_REQUEST });

      // let { userLogin: userInfo } = getState();

      const config = {
        headers: {
          // Authorization: `Bearer ${userInfo.userLogin.userInfo.data.token}`,
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(
        `/api/orders/all?keyword=${keyword}&&pageNumber=${pageNumber}`,
        config
      );

      dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: ORDER_LIST_FAIL,
        payload: message,
      });
    }
  };

//ALL ORDER WITH PAID SUCCESS
export const listOrdersPaidS =
  (isPaid = "") =>
  async (dispatch) => {
    const token = ADMIN_TOKEN;
    try {
      await dispatch({ type: ORDER_LISTFILTERPAID_REQUEST });

      // let { userLogin: userInfo } = getState();

      const config = {
        headers: {
          // Authorization: `Bearer ${userInfo.userLogin.userInfo.data.token}`,
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(
        `/api/orders/allPaidS?isPaid=${isPaid}`,
        config
      );

      dispatch({ type: ORDER_LISTFILTERPAID_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: ORDER_LISTFILTERPAID_FAIL,
        payload: message,
      });
    }
  };

//ALL ORDER FITER NAME OF USER
export const listOrdersFiterName =
  (name = "", pageFiterNumber = "") =>
  async (dispatch, getState) => {
    const token = ADMIN_TOKEN;
    try {
      await dispatch({ type: ORDER_LISTFILTERNAME_REQUEST });

      // let { userLogin: userInfo } = getState();

      const config = {
        headers: {
          // Authorization: `Bearer ${userInfo.userLogin.userInfo.data.token}`,
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(
        `/api/orders/allOrder?name=${name}&&pageFiter=${pageFiterNumber}`,
        config
      );

      dispatch({ type: ORDER_LISTFILTERNAME_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: ORDER_LISTFILTERNAME_FAIL,
        payload: message,
      });
    }
  };

//ORDER DETAILS
export const getOrderDetails = (id) => async (dispatch) => {
  const token = ADMIN_TOKEN;
  try {
    await dispatch({ type: ORDER_DETAILS_REQUEST });

    // let { userLogin: userInfo } = getState();

    const config = {
      headers: {
        // Authorization: `Bearer ${userInfo.userLogin.userInfo.data.token}`,
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/${id}`, config);

    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: message,
    });
  }
};

//ORDER DELIVERED
export const deliverOrder = (order) => async (dispatch) => {
  const token = ADMIN_TOKEN;
  try {
    await dispatch({ type: ORDER_DELIVERED_REQUEST });

    // let { userLogin: userInfo } = getState();

    const config = {
      headers: {
        // Authorization: `Bearer ${userInfo.userLogin.userInfo.data.token}`,
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios
      .put(`/api/orders/${order._id}/delivered`, {}, config)
      .then((res) =>
        dispatch({ type: ORDER_DELIVERED_SUCCESS, payload: res.data })
      );
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_DELIVERED_FAIL,
      payload: message,
    });
  }
};
