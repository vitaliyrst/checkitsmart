import {FETCH_DATA} from "../types";

const initialState = {
    catalog: []
}

export const catalogReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DATA :
            return {...state, catalog: action.payload}
        default :
            return state;
    }
}