import {
  USER_DISABLED_FAIL,
  USER_DISABLED_REQUEST,
  USER_DISABLED_SUCCESS,
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
        // userlogin2: {
        //   ...state.userlogin2,
        //   status: true,
        //   userInfo: action.payload,
        // },
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
      // console.log(action.payload);
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
