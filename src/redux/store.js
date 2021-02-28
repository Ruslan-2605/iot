import thunkMiddleWare from "redux-thunk";
import { authReducer } from "./reducers/authReducer";
import { thingsReducer } from "./reducers/thingsReducer";
import { projectsReducer } from "./reducers/projectsReducer";


const { createStore, combineReducers, applyMiddleware, compose } = require("redux");

let reducers = combineReducers({
    auth: authReducer,
    projects: projectsReducer,
    things: thingsReducer,
});

// let store = createStore(reducers, applyMiddleware(thunkMiddleWare));

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleWare)));

export default store;
