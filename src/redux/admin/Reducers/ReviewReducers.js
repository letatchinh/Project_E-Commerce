import {
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
        reviews: action.payload,
      };
    case REVIEW_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
