import * as TYPES from "./Types";
const initvalue = {
 listCarts : []
};
const cartReducers = (state = initvalue, action) => {
  switch (action.type) {
    case TYPES.FETCH_CART:
        return {
            ...state,
            listCarts : action.payload
        }
    case TYPES.ADD_CART:
        return {
            ...state,
            listCarts : [...state.listCarts,action.payload]
        }
    case TYPES.DELETE_CART:
      const {user,product} = action.payload
      const newArr = state.listCarts.filter(e => e.user !== user || e.product !== product)
        return {
            ...state,
            listCarts : newArr
        }
    case TYPES.INCREASE_QUANLITY:
      const newCart = state.listCarts.map(e => {
        if(e._id === action.payload._id){
          e.quanlity++
        }
        return e
      })
        return {
            ...state,
            listCarts : newCart
        }
    case TYPES.DECREASE_QUANLITY:
      const newCart2 = state.listCarts.map(e => {
        if(e._id === action.payload._id){
          e.quanlity--
        }
        return e
      })
        return {
            ...state,
            listCarts : newCart2
        }
    default:
      return state;
  }
};
export default cartReducers;
