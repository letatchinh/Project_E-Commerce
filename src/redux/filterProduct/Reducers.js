import * as TYPES from "./Types";
const initvalue = {
  listShow: [],
};
const filterProductReducer = (state = initvalue, action) => {
  switch (action.type) {
    case TYPES.RECEIVE_LIST:
      return {
        ...state,
        listShow: action.payload,
      };
    case TYPES.SORT_PRICE_HIGH_TO_LOW:
      return {
        ...state,
        listShow: state.listShow.sort(function (a, b) {
          return b.price - a.price;
        }),
      };
    case TYPES.SORT_PRICE_LOW_TO_HIGH:
      return {
        ...state,
        listShow: state.listShow.sort(function (a, b) {
          return a.price - b.price;
        }),
      };
    case TYPES.SORT_RATING_HIGH_TO_LOW:
      return {
        ...state,
        listShow: state.listShow.sort(function (a, b) {
          return b.rating - a.rating;
        }),
      };
    case TYPES.SORT_RATING_LOW_TO_HIGH:
      return {
        ...state,
        listShow: state.listShow.sort(function (a, b) {
          return a.rating - b.rating;
        }),
      };
    default:
      return state;
  }
};
export default filterProductReducer;
