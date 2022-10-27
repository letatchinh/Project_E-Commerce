import * as TYPES from "./Types";
const initvalue = {
  keyword : "",
  type : null,
  sortPrice : null,
  sortRating : null,
  low5 : null,
  more10 : null,
  more50 : null,
  gteRating : null,
};
const filterProductReducer = (state = initvalue, action) => {
  switch (action.type) {
      case TYPES.SET_SEARCH_KEYWORD:
        return {
          ...state,
          keyword : action.payload
        }
      case TYPES.SET_CATEGORY_SEARCH:
        return {
          ...state,
          type : action.payload
        }
      case TYPES.SET_SORT_PRICE:
        return {
          ...state,
          sortPrice : action.payload
        }
      case TYPES.SET_SORT_RATING:
        return {
          ...state,
          sortRating : action.payload
        }
      case TYPES.SET_SORT_PRICE_LESS_5:
        return {
          ...state,
          low5 : action.payload
        }
      case TYPES.SET_SORT_PRICE_MORE_10:
        return {
          ...state,
          more10 : action.payload
        }
        case TYPES.SET_SORT_PRICE_MORE_50:
          return {
            ...state,
            more50 : action.payload
          }
        case TYPES.SET_GTE_RATING:
          return {
            ...state,
            gteRating : action.payload
          }
          case "RESET_FILTER":
            return {
              ...state,
              keyword : "",
  type : null,
  sortPrice : null,
  sortRating : null,
  low5 : null,
  more10 : null,
  more50 : null,
  gteRating : null,
            }
      
    default:
      return state;
  }
};
export default filterProductReducer;
