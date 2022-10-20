import axios from "axios";
import {
  REVIEW_LIST_FAIL,
  REVIEW_LIST_REQUEST,
  REVIEW_LIST_SUCCESS,
} from "../Constants/ReviewContants";
import { ADMIN_TOKEN } from "../Constants/token";
import { logout } from "./UserActions";

export const listReviews = () => async (dispatch, getState) => {
  try {
    const token = ADMIN_TOKEN;
    await dispatch({ type: REVIEW_LIST_REQUEST });

    // let { userLogin: userInfo } = getState();

    const config = {
      headers: {
        // Authorization: `Bearer ${userInfo.userLogin.userInfo.data.token}`,
        // Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(`/api/reviews/all`, config);

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
