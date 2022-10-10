import { applyMiddleware, compose, createStore } from "redux";
import rootReducer from "./rootReducer";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import mySaga from "./sagas/Mysaga";

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk, sagaMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : composeEnhancers
  )
);
export default store;
sagaMiddleware.run(mySaga);
