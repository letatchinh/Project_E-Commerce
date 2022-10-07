import axios from "axios";
import {
  ORDER_DELIVERED_FAIL,
  ORDER_DELIVERED_REQUEST,
  ORDER_DELIVERED_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
} from "../Constants/OrderContants";
import { logout } from "./UserActions";

//ALL PRODUCT
export const listOrders = () => async (dispatch, getState) => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzM2ZhNjY5ODZhZmEyZTI5NjRkMWM1MiIsImlhdCI6MTY2NTExNjU5OCwiZXhwIjoxNjY3NzA4NTk4fQ.rRJQouHDC2vssf648fOu86oPZ5eUcEJINu5myj4m5cA";
  try {
    await dispatch({ type: ORDER_LIST_REQUEST });

    // let { userLogin: userInfo } = getState();

    const config = {
      headers: {
        // Authorization: `Bearer ${userInfo.userLogin.userInfo.data.token}`,
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/all`, config);

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

//ORDER DETAILS
export const getOrderDetails = (id) => async (dispatch) => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzM2ZhNjY5ODZhZmEyZTI5NjRkMWM1MiIsImlhdCI6MTY2NTExNjU5OCwiZXhwIjoxNjY3NzA4NTk4fQ.rRJQouHDC2vssf648fOu86oPZ5eUcEJINu5myj4m5cA";
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
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzM2ZhNjY5ODZhZmEyZTI5NjRkMWM1MiIsImlhdCI6MTY2NTExNjU5OCwiZXhwIjoxNjY3NzA4NTk4fQ.rRJQouHDC2vssf648fOu86oPZ5eUcEJINu5myj4m5cA";
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
