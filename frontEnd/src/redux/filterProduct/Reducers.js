import * as TYPES from "./Types";
const initvalue = {
  keyword : "",
  category : null,
  sortPrice : null,
  sortRating : null,
  sortSold : null,
  sortNew : null,
  low5 : null,
  more10 : null,
  more50 : null,
  gteRating : null,
  min : null,
  max : null,
  page : Number(1)
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
          category : action.payload
        }
      case TYPES.SET_SORT_PRICE:
        return {
          ...state,
          sortRating : null,
          sortSold : null,
          sortNew : null,
          sortPrice : action.payload
        }
      case TYPES.SET_SORT_RATING:
        return {
          ...state,
          sortPrice : null,
          sortSold : null,
          sortNew : null,
          sortRating : action.payload
        }
      case TYPES.SET_SORT_NEW:
        return {
          ...state,
          sortPrice : null,
          sortRating : null,
          sortSold : null,
          sortNew : action.payload
        }
      case TYPES.SET_SORT_SOLD:
        return {
          ...state,
          sortPrice : null,
          sortRating : null,
          sortNew : null,
          sortSold : action.payload
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
        case "SET_MAX_PRICE":
          return {
            ...state,
            max : action.payload
          }
        case "SET_PAGE":
          return {
            ...state,
            page : action.payload
          }
        case "SET_MIN_PRICE":
          return {
            ...state,
            min : action.payload
          }
          case "FETCH_URL_GET_PARAM":
            const keyString = ['keyword','category']
              for (const property in state) {
              action.payload.forEach(e => {
                if(e[0] === property){
                 
                  state[property] = (keyString.includes(property)) ? e[1] : parseFloat(e[1])
                }
              })
               }
             
              
             
          return {
           ...state,
      

          }
          case "RESET_FILTER":
            return {
              ...state,
              keyword : "",
  category : null,
  sortPrice : null,
  sortRating : null,
  min : null,
  max : null,
  gteRating : null,
  page : 1,
            }
      
    default:
      return state;
  }
};
export default filterProductReducer;
