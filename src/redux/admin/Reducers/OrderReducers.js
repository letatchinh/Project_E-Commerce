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
  ORDER_LISTNOPAGINATION_REQUEST,
  ORDER_LISTNOPAGINATION_SUCCESS,
  ORDER_LISTNOTICE_FAIL,
  ORDER_LISTNOTICE_REQUEST,
  ORDER_LISTNOTICE_SUCCESS,
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
        count: action.payload.count,
      };
    case ORDER_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
//ALL ORDERS FILTER PAID
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
export const orderDeliveredReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELIVERED_REQUEST:
      return { ...state, loading: true };
    case ORDER_DELIVERED_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case ORDER_DETAILS_FAIL:
      return { ...state, loading: false, error: action.payload };
    case ORDER_DELIVERED_RESET:
      return { ...state };
    default:
      return state;
  }
};

//USER DISABLED
export const orderNoticeReducer = (state = { orderWatch: {} }, action) => {
  switch (action.type) {
    case ORDER_LISTNOTICE_REQUEST:
      return { ...state, loadingNotice: true };
    case ORDER_LISTNOTICE_SUCCESS:
      return {
        ...state,
        loadingNotice: false,
        orderWatch: action.payload,
      };
    case ORDER_LISTNOTICE_FAIL:
      return { ...state, loadingNotice: false, errorNotice: action.payload };

    default:
      return state;
  }
};

//ALL ORDER NO PAGINATION
export const orderListNopaginationReducer = (
  state = { ordersNotice: [] },
  action
) => {
  switch (action.type) {
    case ORDER_LISTNOPAGINATION_REQUEST:
      return { ...state, loadingOrdersNotice: true };
    case ORDER_LISTNOPAGINATION_SUCCESS:
      return {
        ...state,
        loadingOrdersNotice: false,
        ordersNotice: action.payload,
      };
    case ORDER_LISTFILTERNAME_FAIL:
      return {
        ...state,
        loadingOrdersNotice: false,
        errorOrdersNotice: action.payload,
      };
    default:
      return state;
  }
};
