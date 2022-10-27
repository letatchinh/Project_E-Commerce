import * as TYPES from "./Types";
const initvalue = {
  keyword : "",
  category : null,
  sortPrice : null,
  sortRating : null,
  low5 : null,
  more10 : null,
  more50 : null,
  gteRating : null,
  low : null,
  more : null,
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
        case "SET_LOW":
          return {
            ...state,
            low : action.payload
          }
        case "SET_PAGE":
          return {
            ...state,
            page : action.payload
          }
        case "SET_MORE":
          return {
            ...state,
            more : action.payload
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
              if(state.low === 5){
               state.low5 = state.low || null
              }
              if(state.more === 10){
                state.more10 = state.more || null
              }
              if(state.more === 50){
                state.more50 = state.more || null
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
