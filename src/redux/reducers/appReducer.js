import {HIDE_LOADER, IS_CART, SET_HEIGHT, SET_OS, SHOW_LOADER} from "../types";

const initialState = {
    os: '',
    height: 0,
    loading: true,
    isCart: false
}

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_OS :
            return {...state, os: action.payload}
        case SET_HEIGHT:
            return {...state, height: action.payload}
        case HIDE_LOADER:
            return {...state, loading: false}
        case SHOW_LOADER:
            return {...state, loading: true}
        case IS_CART :
            return {...state, isCart: action.payload}
        default :
            return state;
    }
}