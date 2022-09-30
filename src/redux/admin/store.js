import { createStore, combineReducers, applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { userLoginReducer } from "./Reducers/userReducers";

let reducer = combineReducers({
  userLoginAdmin: userLoginReducer,
});

//login

const middleware = [thunk];

const stores = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default stores;
