import thunkMiddleWare from "redux-thunk";
import { authReducer } from "./reducers/authReducer";
import { deviceReducer } from "./reducers/deviceReducer";
import { projectReducer } from "./reducers/projectReducer";


const { createStore, combineReducers, applyMiddleware, compose } = require("redux");

let reducers = combineReducers({
    auth: authReducer,
    project: projectReducer,
    device: deviceReducer,
});

// let store = createStore(reducers, applyMiddleware(thunkMiddleWare));

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleWare)));

export default store;
