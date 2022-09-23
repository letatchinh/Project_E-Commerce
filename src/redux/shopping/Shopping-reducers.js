import * as TYPES from "./Shopping-types";
const initvalue = {
  listProduct: [],
  newProduct: {
    name: "",
    price: 0,
    image: "",
    isSell: false,
  },
  searchKeyword : "",
  setSearchKeyword : "",
  
};
const shopReducer = (state = initvalue, action) => {
  switch (action.type) {
    case TYPES.CALL_API_PRODUCT:
      return {
        ...state,
        listProduct: action.payload,
      }
    case TYPES.CHANGE_NAME:
      return {
        ...state,
        newProduct: { ...state.newProduct, name: action.payload }
      }
    case TYPES.CHANGE_SEARCH_KEYWORD:
      return {
        ...state,
        searchKeyword: action.payload
      }
    case TYPES.SET_SEARCH_KEYWORD:
      return {
        ...state,
        setSearchKeyword: action.payload
      }
    case TYPES.CHANGE_PRICE:
      return {
        ...state,
        newProduct: { ...state.newProduct, price : action.payload }
      }
    case TYPES.CHANGE_IMAGE:
      return {
        ...state,
        newProduct: { ...state.newProduct, image: action.payload }
      }
      case TYPES.ADD_NEW_PRODUCT:
        return {
          ...state , listProduct : [...state.listProduct , action.payload]
        }
        case TYPES.ADD_RATING:
          const newListproduct = state.listProduct.map(e => {
            if(e.id === action.payload.id){
              // e = action.payload
              console.log(e);
            }
            return e
          })
          return{
            ...state , listProduct : newListproduct
          }
    default:
      return state;
  }
};
export default shopReducer;
