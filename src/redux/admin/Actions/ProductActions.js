import axios from "axios";
import {
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_EDIT_FAIL,
  PRODUCT_EDIT_REQUEST,
  PRODUCT_EDIT_SUCCESS,
  PRODUCT_LISTALL_FAIL,
  PRODUCT_LISTALL_REQUEST,
  PRODUCT_LISTALL_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
} from "../Constants/ProductContants";
import { ADMIN_TOKEN } from "../Constants/token";
import { logout } from "./UserActions";

//ALL PRODUCT WITH PAGENITION
export const listProducts =
  (keyword = "", pageNumber = "", sortPrice = "", keywordCategory = "") =>
  async (dispatch, getState) => {
    try {
      const token = ADMIN_TOKEN;
      await dispatch({ type: PRODUCT_LIST_REQUEST });

      // let { userLogin: userInfo } = getState();

      const config = {
        headers: {
          // Authorization: `Bearer ${userInfo.userLogin.userInfo.data.token}`,
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(
        `/api/products/all?keyword=${keyword}&&pageNumber=${pageNumber}&&sortPrice=${sortPrice}&&category=${keywordCategory}`,
        config
      );

      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload: message,
      });
    }
  };

//ALL PRODUCT WITH PAGENITION
// export const listProductsSortHight = () => async (dispatch) => {
//   const token =
//     ADMIN_TOKEN;
//   try {
//     await dispatch({ type: PRODUCT_LIST_REQUEST });

//     // let { userLogin: userInfo } = getState();

//     const config = {
//       headers: {
//         // Authorization: `Bearer ${userInfo.userLogin.userInfo.data.token}`,
//         Authorization: `Bearer ${token}`,
//       },
//     };

//     const { data } = await axios.get(`/api/products/allSortHigh`, config);

//     dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
//   } catch (error) {
//     const message =
//       error.response && error.response.data.message
//         ? error.response.data.message
//         : error.message;
//     if (message === "Not authorized, token failed") {
//       dispatch(logout());
//     }
//     dispatch({
//       type: PRODUCT_LIST_FAIL,
//       payload: message,
//     });
//   }
// };

//ALL PRODUCT NO PAGENATION
export const listAllProducts = () => async (dispatch, getState) => {
  const token = ADMIN_TOKEN;
  try {
    await dispatch({ type: PRODUCT_LISTALL_REQUEST });

    // let { userLogin: userInfo } = getState();

    const config = {
      headers: {
        // Authorization: `Bearer ${userInfo.userLogin.userInfo.data.token}`,
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(`/api/products/allProduct`, config);

    dispatch({ type: PRODUCT_LISTALL_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: PRODUCT_LISTALL_FAIL,
      payload: message,
    });
  }
};

//CURRENCY VND
export const currencyVND = () => async (dispatch) => {
  const token = ADMIN_TOKEN;
  try {
    await dispatch({ type: PRODUCT_LISTALL_REQUEST });

    // let { userLogin: userInfo } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${userInfo.userLogin.userInfo.data.token}`,
        // Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post(`/api/products/currencyVND`, config);

    dispatch({ type: PRODUCT_LISTALL_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: PRODUCT_LISTALL_FAIL,
      payload: message,
    });
  }
};

//CURRENCY USD
export const currencyUSD = () => async (dispatch) => {
  const token = ADMIN_TOKEN;
  try {
    await dispatch({ type: PRODUCT_LISTALL_REQUEST });

    // let { userLogin: userInfo } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${userInfo.userLogin.userInfo.data.token}`,
        // Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post(`/api/products/currencyUSD`, config);

    dispatch({ type: PRODUCT_LISTALL_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: PRODUCT_LISTALL_FAIL,
      payload: message,
    });
  }
};

//DELETE PRODUCT
export const deleteProduct = (id) => async (dispatch, getState) => {
  const token = ADMIN_TOKEN;
  try {
    await dispatch({ type: PRODUCT_DELETE_REQUEST });

    // let { userLogin: userInfo } = getState();

    const config = {
      headers: {
        // Authorization: `Bearer ${userInfo.userLogin.userInfo.data.token}`,
        Authorization: `Bearer ${token}`,
      },
    };

    await axios.delete(`/api/products/${id}`, config);

    dispatch({ type: PRODUCT_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload: message,
    });
  }
};

// CREATE PRODUCT
export const createProduct =
  (
    name,
    price,
    description,
    countInStock,
    images,
    category,
    discount,
    quantitySold
  ) =>
  async (dispatch, getState) => {
    const token = ADMIN_TOKEN;
    try {
      await dispatch({ type: PRODUCT_CREATE_REQUEST });

      // let { userLogin: userInfo } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${userInfo.userLogin.userInfo.data.token}`,
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(
        `/api/products/`,
        {
          name,
          price,
          description,
          countInStock,
          images,
          category,
          discount,
          quantitySold,
        },
        config
      );

      dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: PRODUCT_CREATE_FAIL,
        payload: message,
      });
    }
  };

//EDIT PRODUCT
export const editProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_EDIT_REQUEST });
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch({ type: PRODUCT_EDIT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: PRODUCT_EDIT_FAIL,
      payload: message,
    });
  }
};

//UPDATE PRODUCT
export const updateProduct = (product) => async (dispatch, getState) => {
  const token = ADMIN_TOKEN;
  try {
    await dispatch({ type: PRODUCT_UPDATE_REQUEST });

    // let { userLogin: userInfo } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${userInfo.userLogin.userInfo.data.token}`,
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.put(
      `/api/products/${product._id}`,
      product,
      config
    );

    dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
    dispatch({ type: PRODUCT_EDIT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload: message,
    });
  }
};
