import {
  USER_ACTIVE_FAIL,
  USER_ACTIVE_REQUEST,
  USER_ACTIVE_SUCCESS,
  USER_DISABLED_FAIL,
  USER_DISABLED_REQUEST,
  USER_DISABLED_SUCCESS,
  USER_EDIT_FAIL,
  USER_EDIT_REQUEST,
  USER_EDIT_SUCCESS,
  USER_FILTERACTIVE_FAIL,
  USER_FILTERACTIVE_REQUEST,
  USER_FILTERACTIVE_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_RESET,
  USER_LIST_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from "../Constants/UserContants";

const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromLocalStorage },
};

//LOGIN
export const userLoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { ...state, loading: true };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
      };
    case USER_LOGIN_FAIL:
      return { ...state, loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

//ALL USER
export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { ...state, loading: true };
    case USER_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        pages: action.payload.pages,
        page: action.payload.page,
        count: action.payload.count,
        users: action.payload,
      };
    case USER_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    case USER_LIST_RESET:
      return { users: [] };
    default:
      return state;
  }
};

//USER DISABLED
export const userDisabledReducer = (state = { updateUser: {} }, action) => {
  switch (action.type) {
    case USER_DISABLED_REQUEST:
      return { ...state, loadings: true };
    case USER_DISABLED_SUCCESS:
      return {
        ...state,
        loadings: false,
        updateUser: action.payload,
      };
    case USER_DISABLED_FAIL:
      return { ...state, loadings: false, errors: action.payload };

    default:
      return state;
  }
};

//USER ACTIVE
export const userOpenActiveReducer = (
  state = { updateActiveUser: {} },
  action
) => {
  switch (action.type) {
    case USER_ACTIVE_REQUEST:
      return { ...state, loadingsActive: true };
    case USER_ACTIVE_SUCCESS:
      return {
        ...state,
        loadingsActive: false,
        updateActiveUser: action.payload,
      };
    case USER_ACTIVE_FAIL:
      return { ...state, loadingsActive: false, errorsActive: action.payload };

    default:
      return state;
  }
};

//ALL ORDERS FILTER ACTIVE
export const userActiveSReducer = (state = { userListActive: [] }, action) => {
  switch (action.type) {
    case USER_FILTERACTIVE_REQUEST:
      return { ...state, loadingActive: true };
    case USER_FILTERACTIVE_SUCCESS:
      return {
        ...state,
        loadingActive: false,
        errorActive: false,
        userListActive: action.payload.userListActive,
      };
    case USER_FILTERACTIVE_FAIL:
      return { ...state, loadingActive: false, errorActive: action.payload };
    default:
      return state;
  }
};

//USER SINGLE
export const userSendMailReducer = (state = { userMail: {} }, action) => {
  switch (action.type) {
    case USER_EDIT_REQUEST:
      return { ...state, loadingEditMail: true };
    case USER_EDIT_SUCCESS:
      return {
        ...state,
        loadingEditMail: false,
        userMail: action.payload,
      };
    case USER_EDIT_FAIL:
      return {
        ...state,
        loadingEditMail: false,
        errorEditMail: action.payload,
      };
    default:
      return state;
  }
};
