import axios from "axios";
import { loading } from "./modal";

// Actions
const FETCH_DATA = "data/FETCH_DATA";
const DISPLAY_MORE_DATA = "data/DISPLAY_MORE_DATA";
const CREATE_NEW_DATA = "data/CREATE_NEW_DATA";
const DELETE_DATA = "data/DELETE_DATA";


// default state
const defaultState = {
    data: [],
    howmanyDisplay: 0
};


// Reducer
export default function reducer(state = defaultState, action = {}) {
    if (action.type === FETCH_DATA) {
        return Object.assign({}, state, { data: action.data });
    }
    else if (action.type === DISPLAY_MORE_DATA) {
        const howmanyDisplay = Math.min(
            state.howmanyDisplay + action.howmany,
            state.data.length
        )
        return Object.assign({}, state, { howmanyDisplay });
    }
    else if (action.type === CREATE_NEW_DATA) {
        const { newRow } = action;
        return Object.assign({}, state, { data: [...state.data, newRow] });
    }
    else if (action.type === DELETE_DATA) {
        const data = Array.from(state.data).filter(row => row.id !== action.id)
        return Object.assign({}, state, { data });
    }
    else return state;
}


// Action 생성자
// import data from "./__mockupData__";
export function fetchData(url) {
  return async dispatch => {
    try {
        dispatch(loading(true));
        let { data } = await axios.get(url);
        data.forEach((row, index) => {
            row.id = index;
            // 데이터 정제
            for (let key in row) {
                if (row[key] instanceof Array) {
                    row[key] = row[key].filter(x => !!x && !isNaN(Number(x)))
                    continue
                } // 아쉬운점. 데이터가 정제되서 왔더라면
                if (row[key].length === 0) continue // Number("") or Number([]) is 0. so deal with it
                if (!isNaN(Number(row[key]))) {
                    row[key] = Number(row[key]);
                }
            }
        });
        dispatch({ type: FETCH_DATA, data });
    } catch (error) {
        console.log(error);
    }
    
    dispatch(loading(false));
    dispatch(displayMoreData(20));
  };
}

export function displayMoreData(howmany) {
    return async (dispatch) => {
        dispatch(loading(true))
        // Fake request. Imitate network latency
        await new Promise((resolve) => {
            setTimeout(() => {
                dispatch({ type: DISPLAY_MORE_DATA, howmany })
                resolve()
            }, 500);
        })
        dispatch(loading(false))
    }
}

export function createNewData(newRow) {
    return { type: CREATE_NEW_DATA, newRow }
}
export function deleteData(id) {
    return { type: DELETE_DATA, id }
}