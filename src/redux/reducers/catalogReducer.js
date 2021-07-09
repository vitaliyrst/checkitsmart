import {FETCH_CATALOG, FETCH_CATEGORY} from "../types";

const initialState = {
    catalog: [],
    category: {}
}

export const catalogReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CATALOG :
            return {...state, catalog: action.payload}
        case FETCH_CATEGORY:
            return {...state, category: action.payload}
        default :
            return state;
    }
}
