import * as TYPES from "./Types";
const initvalue = {
  listCarts: [],
  count: 0,
  totalBill: 0,
  allListCart: [],
  taxShip : 0,
  voucher : 0,
  CodeVoucher : null,
  SubAddress : null
};
const cartReducers = (state = initvalue, action) => {
  switch (action.type) {
    case TYPES.FETCH_CART:
      return {
        ...state,
        listCarts: action.payload.cart,
        count: action.payload.count,
        allListCart: action.payload.allCarts,
      };
    case TYPES.FETCH_CART_NEW:
      return {
        ...state,
        allListCart: action.payload,
      };
    case TYPES.ADD_CART:
      return {
        ...state,
        allListCart: [...state.allListCart, action.payload],
      };
    case TYPES.CAL_TOTAL_BILL:
      const arrChecked = state.allListCart.filter((e) => e.isChecked);
      const newTotal = arrChecked.reduce((sum, arr) => {
        
        if(arr.discount > 0){
         const Newprice = (arr.price - (arr.price * arr.discount) / 100)
        
         return sum + Newprice * arr.quanlity;
        }
        else{
          return sum + arr.price * arr.quanlity;
        }
       
      }, 0);
      return {
        ...state,
        totalBill: parseFloat(newTotal.toFixed(2)),
      };
      case TYPES.CAL_VOUCHER:
        return {
          ...state,
          voucher: action.payload.discount,
          CodeVoucher: action.payload._id,
        };
   
      case "FETCH_SUBADDRESS":
        return {
          ...state,
          SubAddress: action.payload,
        };
    case "FETCH_TAX_SHIP":
  
      return {
        ...state,
        taxShip: action.payload,
      };
    case TYPES.INCREASE_QUANLITY:
      const newCart = state.allListCart.map((e) => {
        if (e._id === action.payload._id) {
          e.quanlity++;
        }
        return e;
      });
      return {
        ...state,
        allListCart: newCart,
      };
    case TYPES.DECREASE_QUANLITY:
      const newCart2 = state.allListCart.map((e) => {
        if (e._id === action.payload._id) {
          e.quanlity--;
        }
        return e;
      });
      return {
        ...state,
        allListCart: newCart2,
      };
    case TYPES.CHECKED_ALL_PRODUCT:
      const newCartCheckALl = state.allListCart.map((e) => {
        if(e.countInStock > e.quanlity){
          e.isChecked = action.payload;
        }
        return e;
      });
      return {
        ...state,
        allListCart: newCartCheckALl,
      };
    default:
      return state;
  }
};
export default cartReducers;
