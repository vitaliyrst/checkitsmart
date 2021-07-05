import {
    FETCH_DATA,
    HIDE_LOADER,
    IS_CART,
    PLANE_DETECTED,
    RETICLE_HIT,
    SET_HEIGHT,
    SET_MATRIX,
    SET_OS,
    SHOW_LOADER
} from "./types";
import data from '../data.json';

export const setOs = (os) => {
    return {
        type: SET_OS,
        payload: os
    }
}

export const setHeight = (height) => {
    return {
        type: SET_HEIGHT,
        payload: height
    }
}

export const hideLoader = () => {
    return {
        type: HIDE_LOADER
    }
}

export const showLoader = () => {
    return {
        type: SHOW_LOADER
    }
}

export const setIsCart = (bool) => {
    return {
        type: IS_CART,
        payload: bool
    }
}

export const fetchData = () => {
    return {
        type: FETCH_DATA,
        payload: data
    }
}

export const setMatrix = (matrix) => {
    return {
        type: SET_MATRIX,
        payload: matrix
    }
}

export const setPlaneDetected = (state) => {
    return {
        type: PLANE_DETECTED,
        payload: state
    }
}

export const setReticleHit = (state) => {
    return {
        type: RETICLE_HIT,
        payload: state
    }
}