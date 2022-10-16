import * as TYPES from "./Types";
const initvalue = {

  loginSuccess: {
   
  },
  statusLogin: false,
};
const userReducer = (state = initvalue, action) => {
  switch (action.type) {
    case TYPES.FETCH_LOGINSUCCESS:
      return {
        ...state,
        loginSuccess: action.payload,
        statusLogin: true,
      };
    case TYPES.LOGIN:
  
        return {
          ...state,
          loginSuccess: action.payload,
        };
       
    case TYPES.LOGOUT: {
      return {
        ...state,
        statusLogin: false,
        loginSuccess: { },
        
      };
    }
    case TYPES.IS_STATUS_LOGIN:
      return {
        ...state,
        statusLogin: true,
      };
    default:
      return state;
  }
};
export default userReducer;
