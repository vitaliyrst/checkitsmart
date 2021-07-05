import {SET_MATRIX} from "../types";

const initialState = {
    matrix: {},
}

export const webXrReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_MATRIX:
            return {...state, matrix: action.payload}
        default:
            return state;
    }
}