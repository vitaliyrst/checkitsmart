import database from "../firebase/firebase";
import {
    FETCH_APP_DESCRIPTION, FETCH_CART_PRODUCTS,
    FETCH_CATALOG, FETCH_CATEGORY, FETCH_PRODUCT,
    HIDE_LOADER,
    IS_CART,
    PLANE_DETECTED, PRODUCT_LOADING,
    RETICLE_HIT, SCROLL_CATEGORY,
    SET_HEIGHT, SET_LANGUAGE,
    SET_MATRIX,
    SET_OS,
    SHOW_LOADER
} from "./types";

// APP

export const setLanguage = (language) => {
    return {
        type: SET_LANGUAGE,
        payload: language
    }
}

export const setOs = (os) => {
    return {
        type: SET_OS,
        payload: os
    }
}

export const fetchAppDescription = (language) => async (dispatch) => {
    try {
        dispatch(showLoader());
        const response = await database.collection(`/${language}`).doc('description');
        const data = await response.get();
        let result;

        if (data.exists) {
            result = data.data();
        }

        dispatch({type: FETCH_APP_DESCRIPTION, payload: result});
        dispatch(hideLoader());
    } catch (e) {
        console.log('Fetch category error', e.message);
        dispatch(hideLoader());
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

export const setScrollCategory = (scroll) => {
    return {
        type: SCROLL_CATEGORY,
        payload: scroll
    }
}

export const fetchCatalog = (language) => async (dispatch) => {
    try {
        dispatch(showLoader());
        const response = await database.collection(`/${language}`).doc('furniture');
        const data = await response.get();
        let result;

        if (data.exists) {
            result = data.data();
        }
        dispatch({type: FETCH_CATALOG, payload: result.data});
        dispatch(hideLoader());
    } catch (e) {
        console.log('Fetch catalog error', e.message);
        dispatch(hideLoader());
    }
}

export const fetchCategory = (category, language, scroll) => async (dispatch) => {
    try {
        dispatch(showLoader());
        const response = await database.collection(`/${language}`).doc('furniture');
        const data = await response.get();
        let result;

        if (data.exists) {
            result = data.data().data.filter(item => item.slug === category);
        }

        dispatch({type: FETCH_CATEGORY, payload: result[0]});
        dispatch(hideLoader());
        window.scrollTo(0, scroll);
    } catch (e) {
        console.log('Fetch category error', e.message);
        dispatch(hideLoader());
    }
}

export const fetchProduct = (category, id, language) => async (dispatch) => {
    try {
        dispatch(showLoader());
        const response = await database.collection(`/${language}`).doc('furniture');
        const data = await response.get();
        let result;

        if (data.exists) {
            let tempCategory = data.data().data.filter(item => item.slug === category);
            result = tempCategory[0].products.filter(item => item.id === Number(id));
            result[0].category = tempCategory[0].title;
            result[0].slug = tempCategory[0].slug;
        }

        dispatch({type: FETCH_PRODUCT, payload: result[0]});
        dispatch(hideLoader());
    } catch (e) {
        console.log('Fetch product error', e.message);
        dispatch(hideLoader());
    }
}

export const productLoading = (state) => {
    return {
        type: PRODUCT_LOADING,
        payload: state
    }
}

export const fetchCartProducts = (product) => async (dispatch) => {
    try {
        dispatch(showLoader());
        dispatch(productLoading(true));

        let result;
        const newArray = [];

        for (let i = 0; i < product.length; i++) {
            const response = await database.collection(`/${product[i].language}`).doc('furniture');
            const data = await response.get();

            if (data.exists) {
                let tempCategory = data.data().data.filter(item => item.slug === product[i].category);
                result = tempCategory[0].products.filter(item => item.id === product[i].id);
                result[0].category = tempCategory[0].title;
                result[0].slug = tempCategory[0].slug;
                result[0].lang = product[i].lang;
                result[0].quantity = product[i].quantity;
                newArray.push(result[0]);
            }
        }

        dispatch({type: FETCH_CART_PRODUCTS, payload: newArray});
        dispatch(hideLoader());
        dispatch(productLoading(false));
    } catch (e) {
        console.log('Fetch cart products error', e.message);
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
