import {PLANE_DETECTED, RETICLE_HIT, SET_MATRIX} from "../types";

const initialState = {
    matrix: {},
    reticleHit: false,
    planeDetected: false
}

export const webXrReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_MATRIX:
            return {...state, matrix: action.payload}
        case PLANE_DETECTED:
            return {...state, planeDetected: action.payload}
        case RETICLE_HIT:
            return {...state, reticleHit: action.payload}
        default:
            return state;
    }
}