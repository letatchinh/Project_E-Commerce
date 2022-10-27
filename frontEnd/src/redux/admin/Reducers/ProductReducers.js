import {
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_RESET,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_EDIT_FAIL,
  PRODUCT_EDIT_REQUEST,
  PRODUCT_EDIT_SUCCESS,
  PRODUCT_LISTALL_FAIL,
  PRODUCT_LISTALL_REQUEST,
  PRODUCT_LISTALL_SUCCESS,
  PRODUCT_LISTSELLER_FAIL,
  PRODUCT_LISTSELLER_REQUEST,
  PRODUCT_LISTSELLER_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_RESET,
  PRODUCT_UPDATE_SUCCESS,
} from "../Constants/ProductContants";

//ALL PRODUCTS WITH PAGINATION
export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { ...state, loading: true, products: [] };
    case PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        pages: action.payload.pages,
        page: action.payload.page,
        products: action.payload.products,
      };
    case PRODUCT_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
//ALL PRODUCTS SELLER WITH PAGINATION
export const productListSellerReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LISTSELLER_REQUEST:
      return { ...state, loadingSeller: true, products: [] };
    case PRODUCT_LISTSELLER_SUCCESS:
      // console.log(action.payload);
      return {
        ...state,
        loadingSeller: false,
        pages: action.payload.pages,
        page: action.payload.page,
        products: action.payload.products,
      };
    case PRODUCT_LISTSELLER_FAIL:
      return { ...state, loadingSeller: false, errorSeller: action.payload };
    default:
      return state;
  }
};

// export const productListSortHighReducer = (
//   state = { productss: [] },
//   action
// ) => {
//   switch (action.type) {
//     case PRODUCT_LIST_REQUEST:
//       return { ...state, loading: true, productss: [] };
//     case PRODUCT_LIST_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         productss: action.payload.products,
//       };
//     case PRODUCT_LIST_FAIL:
//       return { ...state, loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };
//ALL PRODUCTS
export const productListAllReducer = (state = { productsAll: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LISTALL_REQUEST:
      return { ...state, loading: true, productsAll: [] };
    case PRODUCT_LISTALL_SUCCESS:
      console.log(action);
      return {
        ...state,
        loading: false,
        productsAll: action.payload,
      };
    case PRODUCT_LISTALL_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
//DELETE PRODUCT
export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case PRODUCT_DELETE_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

//EDIT PRODUCT
export const productEditReducer = (
  state = { product: { review: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCT_EDIT_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_EDIT_SUCCESS:
      return {
        ...state,
        loading: false,
        product: action.payload,
        error: "",
      };
    case PRODUCT_EDIT_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

//CREATE PRODUCT
export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        product: action.payload,
        error: "",
      };
    case PRODUCT_CREATE_FAIL:
      return { ...state, loading: false, error: action.payload };
    case PRODUCT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

//UPDATE PRODUCT
export const productUpdateReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        product: action.payload,
        error: "",
      };
    case PRODUCT_UPDATE_FAIL:
      return { ...state, loading: false, error: action.payload };
    case PRODUCT_UPDATE_RESET:
      return { ...state, product: {} };
    default:
      return state;
  }
};
