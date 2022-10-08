import * as TYPES from "./Types";
const initvalue = {
 listCarts : []
};
const cartReducers = (state = initvalue, action) => {
  switch (action.type) {
    case TYPES.FETCH_CART:
        return {
            ...state,
            listCarts : [...state.listCarts,action.payload]
        }
        case TYPES.DID_MOUT_FETCH_CART:
        return {
            ...state,
            listCarts : []
        }
    default:
      return state;
  }
};
export default cartReducers;
