import {
  USER_DISABLED_FAIL,
  USER_DISABLED_REQUEST,
  USER_DISABLED_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_RESET,
  USER_LIST_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from "../Constants/UserContants";
import axios from "axios";
import { ADMIN_TOKEN } from "../Constants/token";

//LOGIN
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const data = await axios.post(
      `/api/users/login`,
      { email, password },
      config
    );

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: message,
    });
  }
};

//LOGOUT
export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_LIST_RESET });
};

//ALL USER
export const listUser =
  (keyword = "", pageNumber = "") =>
  async (dispatch, getState) => {
    const token = ADMIN_TOKEN;
    try {
      await dispatch({ type: USER_LIST_REQUEST });

      // let { userLogin: userInfo } = getState();

      const config = {
        headers: {
          // Authorization: `Bearer ${userInfo.userLogin.userInfo.data.token}`,
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(
        `/api/users/all?name=${keyword}&&pageNumber=${pageNumber}`,
        config
      );

      dispatch({ type: USER_LIST_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: USER_LIST_FAIL,
        payload: message,
      });
    }
  };

//USER DELIVERED
export const userDisabledaction = (user) => async (dispatch) => {
  const token = ADMIN_TOKEN;
  try {
    await dispatch({ type: USER_DISABLED_REQUEST });

    // let { userLogin: userInfo } = getState();

    const config = {
      headers: {
        // Authorization: `Bearer ${userInfo.userLogin.userInfo.data.token}`,
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios
      .put(`/api/users/${user._id}/disabled`, config)
      .then((res) =>
        dispatch({ type: USER_DISABLED_SUCCESS, payload: res.updateUser })
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
      type: USER_DISABLED_FAIL,
      payload: message,
    });
  }
};
