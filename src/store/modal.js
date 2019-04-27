// Actions
const PUSH_MESSAGE = 'modal/PUSH_MESSAGE';
const LOADING = 'modal/LOADING';
const MODAL_RESET = 'modal/MODAL_RESET';

// default state
const defaultState = {
    message: "",
    loading: false,
}

// Reducer
export default function reducer(state=defaultState, action={}) {
    if (action.type === PUSH_MESSAGE) {
        return Object.assign({}, state, { message: action.message })
    }
    else if (action.type === LOADING) {
        return Object.assign({}, state, { loading: action.on })
    }
    else if (action.type === MODAL_RESET) {
        return Object.assign({}, state, defaultState)
    }
    else return state
}

// Action 생성자
export function pushMessage(message) {
  return { type: PUSH_MESSAGE, message  };
}
export function loading(on) {
  return { type: LOADING, on };
}
export function modalReset() {
  return { type: MODAL_RESET };
}
