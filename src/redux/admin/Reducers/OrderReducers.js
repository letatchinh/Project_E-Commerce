import {
  ORDER_DELIVERED_REQUEST,
  ORDER_DELIVERED_RESET,
  ORDER_DELIVERED_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_LISTFILTERNAME_FAIL,
  ORDER_LISTFILTERNAME_REQUEST,
  ORDER_LISTFILTERNAME_SUCCESS,
  ORDER_LISTFILTERPAID_FAIL,
  ORDER_LISTFILTERPAID_REQUEST,
  ORDER_LISTFILTERPAID_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
} from "../Constants/OrderContants";

//ALL ORDERS
export const orderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return { ...state, loading: true };
    case ORDER_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        pages: action.payload.pages,
        page: action.payload.page,
        orders: action.payload.orders,
      };
    case ORDER_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
//ALL ORDERS
export const orderListPaidSReducer = (state = { ordersPaidS: [] }, action) => {
  switch (action.type) {
    case ORDER_LISTFILTERPAID_REQUEST:
      return { ...state, loadingPaid: true };
    case ORDER_LISTFILTERPAID_SUCCESS:
      return {
        ...state,
        loadingPaid: false,
        ordersPaidS: action.payload.ordersPaidS,
      };
    case ORDER_LISTFILTERPAID_FAIL:
      return { ...state, loadingPaid: false, errorPaid: action.payload };
    default:
      return state;
  }
};
//ALL ORDER FILTER NAME USER
export const orderListFiterNameReducer = (
  state = { ordersFilter: [] },
  action
) => {
  switch (action.type) {
    case ORDER_LISTFILTERNAME_REQUEST:
      return { ...state, loadings: true };
    case ORDER_LISTFILTERNAME_SUCCESS:
      return {
        ...state,
        loadings: false,
        pagesFiter: action.payload.pagesFiter,
        pageFiter: action.payload.pageFiter,
        ordersFilter: action.payload.ordersFilter,
      };
    case ORDER_LISTFILTERNAME_FAIL:
      return { ...state, loadings: false, errors: action.payload };
    default:
      return state;
  }
};

//ORDER DETAIL
export const orderDetailsReducer = (
  state = { loading: true, orderItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        order: action.payload,
      };
    case ORDER_DETAILS_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

//ORDER DELIVERED
export const orderDeliveredReducer = (state = { data: {} }, action) => {
  switch (action.type) {
    case ORDER_DELIVERED_REQUEST:
      return { ...state, loading: true };
    case ORDER_DELIVERED_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        data: action.payload,
      };
    case ORDER_DETAILS_FAIL:
      return { ...state, loading: false, error: action.payload };
    case ORDER_DELIVERED_RESET:
      return { ...state };
    default:
      return state;
  }
};
