import * as __ from "../Constants/UserContants";
import axios from "axios";
import { ADMIN_TOKEN } from "../Constants/token";

//LOGIN
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: __.USER_LOGIN_REQUEST });

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

    dispatch({ type: __.USER_LOGIN_SUCCESS, payload: data });

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
      type: __.USER_LOGIN_FAIL,
      payload: message,
    });
  }
};

//LOGOUT
export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: __.USER_LOGOUT });
  dispatch({ type: __.USER_LIST_RESET });
};

//ALL USER
export const listUser =
  (keyword = "", pageNumber = "", active = "") =>
  async (dispatch, getState) => {
    const token = ADMIN_TOKEN;
    try {
      await dispatch({ type: __.USER_LIST_REQUEST });

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(
        `/api/users/all?name=${keyword}&&active=${active}&&pageNumber=${pageNumber}`,
        config
      );

      dispatch({ type: __.USER_LIST_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: __.USER_LIST_FAIL,
        payload: message,
      });
    }
  };

//USER DISABLED
export const userDisabledaction = (user) => async (dispatch) => {
  const token = ADMIN_TOKEN;
  try {
    await dispatch({ type: __.USER_DISABLED_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await axios
      .put(`/api/users/${user._id}/disabled`, config)
      .then((res) =>
        dispatch({ type: __.USER_DISABLED_SUCCESS, payload: res.updateUser })
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
      type: __.USER_DISABLED_FAIL,
      payload: message,
    });
  }
};

//USER ACTIVE
export const userActiveaction = (user) => async (dispatch) => {
  const token = ADMIN_TOKEN;
  try {
    await dispatch({ type: __.USER_ACTIVE_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await axios.put(`/api/users/${user._id}/active`, config).then((res) =>
      dispatch({
        type: __.USER_ACTIVE_SUCCESS,
        payload: res.updateActiveUser,
      })
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
      type: __.USER_ACTIVE_FAIL,
      payload: message,
    });
  }
};

//EDIT PRODUCT
export const editUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: __.USER_EDIT_REQUEST });
    const { data } = await axios.get(`/api/users/${id}/sendMail`);
    dispatch({ type: __.USER_EDIT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: __.USER_EDIT_FAIL,
      payload: message,
    });
  }
};
