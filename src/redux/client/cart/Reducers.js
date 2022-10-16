import * as TYPES from "./Types";
const initvalue = {
 listCarts : [],
 count : 0,
 totalBill :0,
  allListCart : []
};
const cartReducers = (state = initvalue, action) => {
  
  switch (action.type) {
    
    case TYPES.FETCH_CART:
        return {
            ...state,
            listCarts : action.payload.cart,
            count : action.payload.count,
            allListCart : action.payload.allCarts,
        }
        case TYPES.FETCH_CART_NEW:
            return {
                ...state,
                
                allListCart : action.payload,
            }
    case TYPES.ADD_CART:
        return {
            ...state,
            allListCart : [...state.allListCart,action.payload]
        }
    case TYPES.CAL_TOTAL_BILL:
      const arrChecked = state.allListCart.filter(e => e.isChecked)
     const newTotal = arrChecked.reduce((sum,arr) => sum + (arr.price * arr.quanlity) ,0)
      return {
        ...state,
        totalBill : newTotal
      }
    // case TYPES.DELETE_CART:
    //   const {product} = action.payload
    //   const newArr = state.allListCart.filter(e => e._id !== product)
    //     return {
    //         ...state,
    //         allListCart : newArr
    //     }
    case TYPES.INCREASE_QUANLITY:
      const newCart = state.allListCart.map(e => {
        if(e._id === action.payload._id){
          e.quanlity++
        }
        return e
      })
        return {
            ...state,
            allListCart : newCart
        }
    case TYPES.DECREASE_QUANLITY:
      const newCart2 = state.allListCart.map(e => {
        if(e._id === action.payload._id){
          e.quanlity--
        }
        return e
      })
        return {
            ...state,
            allListCart : newCart2
        }
        case TYPES.CHECKED_ALL_PRODUCT:
          const newCartCheckALl = state.allListCart.map(e => {
            e.isChecked = action.payload
            return e
          })
            return {
                ...state,
                allListCart : newCartCheckALl
            }
    default:
      return state;
  }
};
export default cartReducers;
