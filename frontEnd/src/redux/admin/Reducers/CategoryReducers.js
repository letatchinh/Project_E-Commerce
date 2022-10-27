import {
  CATEGORY_CREATE_FAIL,
  CATEGORY_CREATE_REQUEST,
  CATEGORY_CREATE_RESET,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_EDIT_FAIL,
  CATEGORY_EDIT_REQUEST,
  CATEGORY_EDIT_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_UPDATE_FAIL,
  CATEGORY_UPDATE_REQUEST,
  CATEGORY_UPDATE_RESET,
  CATEGORY_UPDATE_SUCCESS,
} from "../Constants/CategoryContants";

//ALL PRODUCTS WITH PAGINATION
export const categoryListReducer = (state = { categorys: [] }, action) => {
  switch (action.type) {
    case CATEGORY_LIST_REQUEST:
      return { ...state, loading: true, categorys: [] };
    case CATEGORY_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        categorys: action.payload.categorys,
      };
    case CATEGORY_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

//CREATE CATEGORY
export const categoryCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_CREATE_REQUEST:
      return { ...state, loading: true };
    case CATEGORY_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        category: action.payload,
        error: "",
      };
    case CATEGORY_CREATE_FAIL:
      return { ...state, loading: false, error: action.payload };
    case CATEGORY_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

//EDIT CATEGORY
export const categoryEditReducer = (state = { category: {} }, action) => {
  switch (action.type) {
    case CATEGORY_EDIT_REQUEST:
      return { ...state, loading: true };
    case CATEGORY_EDIT_SUCCESS:
      return {
        ...state,
        loading: false,
        category: action.payload,
        error: "",
      };
    case CATEGORY_EDIT_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

//UPDATE
export const categoryUpdateReducer = (state = { category: {} }, action) => {
  switch (action.type) {
    case CATEGORY_UPDATE_REQUEST:
      return { ...state, loading: true };
    case CATEGORY_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        category: action.payload,
        error: "",
      };
    case CATEGORY_UPDATE_FAIL:
      return { ...state, loading: false, error: action.payload };
    case CATEGORY_UPDATE_RESET:
      return { ...state, product: {} };
    default:
      return state;
  }
};
