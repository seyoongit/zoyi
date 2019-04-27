// Actions
const CHANGE_QUERY = "search/CHANGE_QUERY";


// default state
const defaultState = {
    query: ""
};


// Reducer
export default function reducer(state = defaultState, action = {}) {
    if (action.type === CHANGE_QUERY) {
        return Object.assign({}, state, { query: action.query });
    }
    else return state;
}


// Action 생성자
export function changeQuery(query) {
    return { type: CHANGE_QUERY, query }
}


// 현재 이 앱에서는 '이미 가지고 있는 데이터' 안에서만 검색어를 사용하여 필터링을 하고 있습니다.
// 그렇기에 이 query 라는 상태는 redux state로 뺄 필요까지 없이 그냥 SimpleTable의 state에 집어넣으면 됩니다.
// 그러나 이게 만약 실제 서비스였다면 검색 기능과 관련해서 서버와 통신을 하기 위한 redux state를 반드시 만들어야만 하기때문에 그냥 redux state로 따로 뺐습니다.