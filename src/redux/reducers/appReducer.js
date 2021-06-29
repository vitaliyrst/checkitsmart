import {HIDE_LOADER, SET_OS, SHOW_LOADER} from "../types";

const initialState = {
    os: '',
    loading: true
}

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_OS :
            return {...state, os: action.payload}
        case HIDE_LOADER:
            return {...state, loading: false}
        case SHOW_LOADER:
            return {...state, loading: true}
        default :
            return state;
    }
}