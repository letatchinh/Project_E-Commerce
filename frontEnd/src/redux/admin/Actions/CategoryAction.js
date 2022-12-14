import axios from "axios";
import {
  CATEGORY_CREATE_FAIL,
  CATEGORY_CREATE_REQUEST,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_EDIT_FAIL,
  CATEGORY_EDIT_REQUEST,
  CATEGORY_EDIT_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_UPDATE_FAIL,
  CATEGORY_UPDATE_REQUEST,
  CATEGORY_UPDATE_SUCCESS,
} from "../Constants/CategoryContants";
import { ADMIN_TOKEN } from "../Constants/token";
import { logout } from "./UserActions";

//ALL PRODUCT NO PAGENATION
export const listAllCategorys = () => async (dispatch) => {
  const token = ADMIN_TOKEN;
  try {
    await dispatch({ type: CATEGORY_LIST_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(`/api/categorys/all`, config);

    dispatch({ type: CATEGORY_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: CATEGORY_LIST_FAIL,
      payload: message,
    });
  }
};

// CREATE CATEGORY
export const createCategory = (name) => async (dispatch, getState) => {
  const token = ADMIN_TOKEN;
  try {
    await dispatch({ type: CATEGORY_CREATE_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post(
      `/api/categorys/`,
      {
        name,
      },
      config
    );

    dispatch({ type: CATEGORY_CREATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: CATEGORY_CREATE_FAIL,
      payload: message,
    });
  }
};

//EDIT CATEGORY
export const editCategory = (id) => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_EDIT_REQUEST });
    const { data } = await axios.get(`/api/categorys/${id}`);
    dispatch({ type: CATEGORY_EDIT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: CATEGORY_EDIT_FAIL,
      payload: message,
    });
  }
};

//UPDATE CATEGORY
export const updateCategory = (category) => async (dispatch, getState) => {
  const token = ADMIN_TOKEN;
  try {
    await dispatch({ type: CATEGORY_UPDATE_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.put(
      `/api/categorys/${category._id}`,
      category,
      config
    );

    dispatch({ type: CATEGORY_UPDATE_SUCCESS, payload: data });
    dispatch({ type: CATEGORY_EDIT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: CATEGORY_UPDATE_FAIL,
      payload: message,
    });
  }
};
