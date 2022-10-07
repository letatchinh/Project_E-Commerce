import * as TYPES from "./Types";
const initvalue = {
  user: [],
  textLogin: {
    username: "",
    password: "",
  },
  loginSuccess: {
    username: "",
    password: "",
    id: "",
    listCarts: [],
    phone : "",
    email : "",
    address : "",
    name : ""
  },
  totalBill : 0,
  statusLogin: false,
};
const userReducer = (state = initvalue, action) => {
  switch (action.type) {
    case TYPES.FETCH_USER:
      return {
        ...state,
        user: action.payload,
      };
      case TYPES.REGISTER:
        return {
          ...state , 
          user : [...state.user ,action.payload]
        }
    case TYPES.FETCH_LOGINSUCCESS:
      return {
        ...state,
        loginSuccess: action.payload,
      };
    case TYPES.ADD_TO_CART:
      return {
        ...state,
        user: state.user.map((e) => {
          if (e.id === action.payload.id) {
            e = { ...action.payload };
          }
          return e;
        }),
        loginSuccess: action.payload,
      };
    case TYPES.REMOVE_ITEM_CART:
      return {
        ...state,
        user: state.user.map((e) => {
          if (e.id === action.payload.id) {
            e = { ...action.payload};
          }
          return e;
        }),
        loginSuccess: action.payload,
      };
    case TYPES.INCREASE_ITEM_CART:
      return {
        ...state,
        user: state.user.map((e) => {
          if (e.id === action.payload.id) {
            e = action.payload;
          }
          return e;
        }),
        loginSuccess: action.payload,
      };
    case TYPES.DECREASE_ITEM_CART:
      return {
        ...state,
        user: state.user.map((e) => {
          if (e.id === action.payload.id) {
            e = action.payload;
          }
          return e;
        }),
        loginSuccess: action.payload,
      };
    case TYPES.CAL_TOLTAL_BILL:
      return {
        ...state,
        totalBill: action.payload.reduce(
          (sum, arr) => sum + arr.price * arr.quanlity , 0
        ),
      };
    case TYPES.CHANGE_USERNAME:
      return {
        ...state,
        textLogin: { ...state.textLogin, username: action.payload },
      };
    case TYPES.CHANGE_PASSWORD:
      return {
        ...state,
        textLogin: { ...state.textLogin, password: action.payload },
      };
    case TYPES.CHECK_LOGIN:
      const accLogin = state.user.filter(
        (e) =>
          e.username === action.payload.username &&
          e.password === action.payload.password
      );
      return {
        ...state,
        statusLogin: accLogin.length > 0,
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
        loginSuccess: { username: "", password: "", id: "" , listCarts : []},
        
      };
    }
    case TYPES.IS_STATUS_LOGIN:
      return {
        ...state,
        statusLogin: true,
      };
      case TYPES.EDIT_USER:
        return {
          ...state,
          loginSuccess : action.payload
        }
      case  TYPES.ADD_LIST_PAYMENT_CHECKED:
        const newArr2 = state.loginSuccess.listCarts.map(e => {
          if(e.id === action.payload.id){
            e.isCheckedPayment = true
          }
          return e
        })
        return {
          ...state,
          loginSuccess : {...state.loginSuccess , listCarts : newArr2}
        }
      case  TYPES.REMOVE_LIST_PAYMENT_CHECKED:
        const newArr = state.loginSuccess.listCarts.map(e => {
          if(e.id === action.payload.id){
            e.isCheckedPayment = false
          }
          return e
        })
        return {
          ...state,
          loginSuccess : {...state.loginSuccess , listCarts : newArr}
        }
        case TYPES.ADD_LIST_ORDER:
          return {
            ...state,
            loginSuccess : action.payload
          }
        case TYPES.REMOVE_LIST_ORDER:
          return{
            ...state ,
            loginSuccess : action.payload
          }
    default:
      return state;
  }
};
export default userReducer;
