import * as TYPES from "./Types";
const initvalue = {
  listShow: [],
  listMain : [],
  FilterMore100000: false,
  FilterMore200000: false,
  FilterLow50000: false,
};
const filterProductReducer = (state = initvalue, action) => {
  switch (action.type) {
    case TYPES.RECEIVE_LIST:
      return {
        ...state,
        listShow: action.payload,
        listMain: action.payload,
      };
    case TYPES.SORT_PRICE_HIGH_TO_LOW:
      return {
        ...state,
        listShow: state.listShow.slice().sort(function (a, b) {
          return b.price - a.price;
        }),
      };
    case TYPES.SORT_PRICE_LOW_TO_HIGH:
      return {
        ...state,
        listShow: state.listShow.slice().sort(function (a, b) {
          return a.price - b.price;
        }),
      };
    case TYPES.SORT_RATING_HIGH_TO_LOW:
      return {
        ...state,
        listShow: state.listShow.slice().sort(function (a, b) {
          return b.rating - a.rating;
        }),
      };
    case TYPES.SORT_RATING_LOW_TO_HIGH:
      return {
        ...state,
        listShow: state.listShow.slice().sort(function (a, b) {
          return a.rating - b.rating;
        }),
      };

    case TYPES.FILTER_LIST:
      const newListFilter = state.listMain.filter(
        (e) =>
          (state.FilterMore100000 && e.price >= 100000) ||
          (state.FilterMore200000 && e.price >= 200000) ||
          (state.FilterLow50000 && e.price <= 50000)
      );
      return {
        ...state,
        listShow: newListFilter,
      };
      case TYPES.FILTER_MORE_200:
      return {
        ...state,
        FilterMore200000: !state.FilterMore200000,
      };
      case TYPES.FILTER_MORE_100:
      return {
        ...state,
        FilterMore100000: !state.FilterMore100000,
      };
      case TYPES.FILTER_LOW_50:
      return {
        ...state,
        FilterLow50000: !state.FilterLow50000,
      };
    default:
      return state;
  }
};
export default filterProductReducer;
