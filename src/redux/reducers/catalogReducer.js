import {FETCH_CATALOG, FETCH_CATEGORY, TEST} from "../types";

const initialState = {
    catalog: [],
    category: {},
    test: null
}

export const catalogReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CATALOG :
            return {...state, catalog: action.payload}
        case FETCH_CATEGORY:
            return {...state, category: action.payload}
        case TEST:
            return {...state, test: action.payload}
        default :
            return state;
    }
}
