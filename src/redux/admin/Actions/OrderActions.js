import axios from "axios";
import {
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
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMmVjNWQxMDMzY2YwMWM1Zjc4MDI5ZSIsImlhdCI6MTY2NDYxMTU1MCwiZXhwIjoxNjY3MjAzNTUwfQ.qEqyNfDJtKHm8qbD1oRZFOsyPLFs8Unp3bqQ-74Y3Gs";
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
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMmVjNWQxMDMzY2YwMWM1Zjc4MDI5ZSIsImlhdCI6MTY2NDYxMTU1MCwiZXhwIjoxNjY3MjAzNTUwfQ.qEqyNfDJtKHm8qbD1oRZFOsyPLFs8Unp3bqQ-74Y3Gs";
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
