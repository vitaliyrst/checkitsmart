import database from "../firebase/firebase";
import {
    FETCH_CATALOG, FETCH_CATEGORY,
    HIDE_LOADER,
    IS_CART,
    PLANE_DETECTED,
    RETICLE_HIT,
    SET_HEIGHT,
    SET_MATRIX,
    SET_OS,
    SHOW_LOADER, TEST
} from "./types";

// APP

export const setOs = (os) => {
    return {
        type: SET_OS,
        payload: os
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

export const setHeight = (height) => {
    return {
        type: SET_HEIGHT,
        payload: height
    }
}

export const setIsCart = (bool) => {
    return {
        type: IS_CART,
        payload: bool
    }
}


//CATALOG

export const fetchData = () => async (dispatch) => {
    try {
        dispatch(showLoader());
        const response = await database.collection('/furniture').orderBy('id');
        const data = await response.get();
        const result = [];
        data.docs.forEach(item => result.push(item.data()));
        dispatch({type: FETCH_CATALOG, payload: result});
        dispatch(hideLoader());
    } catch (e) {
        console.log('Fetch catalog error', e.message);
        dispatch(hideLoader());
    }
}

export const fetchCategory = (slug) => async (dispatch) => {
    try {
        dispatch(showLoader());
        const response = await database.collection('/furniture').where('slug', '==', slug);
        const data = await response.get();
        const result = [];

        data.docs.forEach(item => {
            result.push(item.data());
        });

        dispatch({type: FETCH_CATEGORY, payload: result[0]});
        dispatch(hideLoader());
    } catch (e) {
        console.log('Fetch category error', e.message);
        dispatch(hideLoader());
    }
}


//WEBXR

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

export const setTest = () => async (dispatch) => {
    try {
        dispatch(showLoader());
        const response = await database.collection('/en').doc('description');
        const data = await response.get();
        let result;

        if (data.exists) {
            result = data.data();
            console.log(result)
        }

        dispatch({type: TEST, payload: result});
        dispatch(hideLoader());
    } catch (e) {
        console.log('Fetch category error', e.message);
        dispatch(hideLoader());
    }
}
