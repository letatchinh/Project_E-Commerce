import {
  REVIEW_ACTIVE_FAIL,
  REVIEW_ACTIVE_REQUEST,
  REVIEW_ACTIVE_SUCCESS,
  REVIEW_DELETE_FAIL,
  REVIEW_DELETE_REQUEST,
  REVIEW_DELETE_SUCCESS,
  REVIEW_DISABLED_FAIL,
  REVIEW_DISABLED_REQUEST,
  REVIEW_DISABLED_RESET,
  REVIEW_DISABLED_SUCCESS,
  REVIEW_LIST_FAIL,
  REVIEW_LIST_REQUEST,
  REVIEW_LIST_SUCCESS,
} from "../Constants/ReviewContants";

//ALL REVIEW
export const reviewListReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case REVIEW_LIST_REQUEST:
      return { ...state, loading: true, reviews: [] };
    case REVIEW_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        pages: action.payload.pages,
        page: action.payload.page,
        count: action.payload.count,
        reviews: action.payload,
      };
    case REVIEW_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

//DELETE PRODUCT
export const reviewDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case REVIEW_DELETE_REQUEST:
      return { ...state, loading: true };
    case REVIEW_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case REVIEW_DELETE_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

//REVIEW DISABLED
export const reviewDisabledReducer = (state = {}, action) => {
  switch (action.type) {
    case REVIEW_DISABLED_REQUEST:
      return { ...state, loading: true };
    case REVIEW_DISABLED_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case REVIEW_DISABLED_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

//REVIEW DISABLED
export const reviewActiveReducer = (state = {}, action) => {
  switch (action.type) {
    case REVIEW_ACTIVE_REQUEST:
      return { ...state, loading: true };
    case REVIEW_DISABLED_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case REVIEW_ACTIVE_SUCCESS:
      return { ...state, loading: false, error: action.payload };
    case REVIEW_ACTIVE_FAIL:
      return { ...state };
    default:
      return state;
  }
};
