import * as TYPES from "./Types";
const initvalue = {
 listCarts : [],
 totalBill :0,

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
    case TYPES.CAL_TOTAL_BILL:
      const arrChecked = state.listCarts.filter(e => e.isChecked)
     const newTotal = arrChecked.reduce((sum,arr) => sum + (arr.price * arr.quanlity) ,0)
      return {
        ...state,
        totalBill : newTotal
      }
    case TYPES.DELETE_CART:
      const {product} = action.payload
      const newArr = state.listCarts.filter(e => e._id !== product)
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
