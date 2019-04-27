import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from "redux-thunk";
import dataState from "./dataState"
import modal from "./modal"
import search from "./search"

const reducers = combineReducers({
    dataState,
    modal,
    search,
})

const reduxMiddlewares = [thunk]

export default createStore(
    reducers, 
    applyMiddleware(...reduxMiddlewares)
)