import axios from "axios";
import {
  REVIEW_ACTIVE_FAIL,
  REVIEW_ACTIVE_REQUEST,
  REVIEW_ACTIVE_SUCCESS,
  REVIEW_DELETE_FAIL,
  REVIEW_DELETE_REQUEST,
  REVIEW_DELETE_SUCCESS,
  REVIEW_DISABLED_FAIL,
  REVIEW_DISABLED_REQUEST,
  REVIEW_DISABLED_SUCCESS,
  REVIEW_LIST_FAIL,
  REVIEW_LIST_REQUEST,
  REVIEW_LIST_SUCCESS,
} from "../Constants/ReviewContants";
import { ADMIN_TOKEN } from "../Constants/token";
import { logout } from "./UserActions";

export const listReviews =
  (keyword = "", pageNumber = "", sortRating = "", activeComment = "") =>
  async (dispatch) => {
    try {
      const token = ADMIN_TOKEN;
      await dispatch({ type: REVIEW_LIST_REQUEST });

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(
        `/api/reviews/allReview?keywordActive=${activeComment}&&keyword=${keyword}&&pageNumber=${pageNumber}&&sortRating=${sortRating}`,
        config
      );
      dispatch({ type: REVIEW_LIST_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: REVIEW_LIST_FAIL,
        payload: message,
      });
    }
  };

//DELETE REVIEW
export const deleteReview = (id) => async (dispatch, getState) => {
  const token = ADMIN_TOKEN;
  try {
    await dispatch({ type: REVIEW_DELETE_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await axios.delete(`/api/reviews/${id}`, config);

    dispatch({ type: REVIEW_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: REVIEW_DELETE_FAIL,
      payload: message,
    });
  }
};

//REVIEW DISABLED
export const disabledReivew = (id) => async (dispatch) => {
  const token = ADMIN_TOKEN;
  try {
    await dispatch({ type: REVIEW_DISABLED_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.put(`/api/reviews/${id}/disabled`, {}, config);

    dispatch({ type: REVIEW_DISABLED_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: REVIEW_DISABLED_FAIL,
      payload: message,
    });
  }
};

//REVIEW ACTIVE
export const activeReivew = (id) => async (dispatch) => {
  const token = ADMIN_TOKEN;
  try {
    await dispatch({ type: REVIEW_ACTIVE_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.put(`/api/reviews/${id}/active`, {}, config);

    dispatch({ type: REVIEW_ACTIVE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: REVIEW_ACTIVE_FAIL,
      payload: message,
    });
  }
};
