import thunkMiddleWare from "redux-thunk";
import { authReducer } from "./authReducer";


const { createStore, combineReducers, applyMiddleware, compose } = require("redux");

let reducers = combineReducers({
    //   dialogsPage: dialogsReducer,
    //   profilePage: profileReducer,
    //   usersPage: usersReducer,
    auth: authReducer,
    //   app: initializeReducer,
});

// let store = createStore(reducers, applyMiddleware(thunkMiddleWare));

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleWare)));

export default store;
