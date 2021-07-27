import {FETCH_CATALOG, FETCH_CATEGORY, FETCH_PRODUCT} from "../types";

const initialState = {
    catalog: [],
    category: [],
    product: {}
}

export const catalogReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CATALOG :
            return {...state, catalog: action.payload}
        case FETCH_CATEGORY:
            return {...state, category: action.payload}
        case FETCH_PRODUCT:
            return {...state, product: action.payload}
        default :
            return state;
    }
}