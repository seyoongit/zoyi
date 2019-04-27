import { bindActionCreators } from 'redux';
import store from "./index";
import * as dataStateActions from "./dataState";
import * as modalActions from "./modal";
import * as searchActions from "./search";

const { dispatch } = store;

export const DataStateActions = bindActionCreators(dataStateActions, dispatch);
export const ModalActions = bindActionCreators(modalActions, dispatch);
export const SearchActions = bindActionCreators(searchActions, dispatch);