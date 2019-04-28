import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from "redux-thunk";
import { reducer as formReducer } from 'redux-form'
import dataState from "./dataState"
import modal from "./modal"
import search from "./search"

const reducers = combineReducers({
    form: formReducer,
    dataState,
    modal,
    search,
})

const reduxMiddlewares = [thunk]

export default createStore(
    reducers, 
    applyMiddleware(...reduxMiddlewares)
)