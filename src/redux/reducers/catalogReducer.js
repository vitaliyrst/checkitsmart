import {
    FETCH_CART_PRODUCTS,
    FETCH_CATALOG,
    FETCH_CATEGORY,
    FETCH_PRODUCT,
    PRODUCT_LOADING,
    SCROLL_CATEGORY
} from "../types";

const initialState = {
    scroll: 0,
    catalog: [],
    category: [],
    product: {},
    cartProducts: [],
    productLoading: false
}

export const catalogReducer = (state = initialState, action) => {
    switch (action.type) {
        case SCROLL_CATEGORY:
            return {...state, scroll: action.payload}
        case FETCH_CATALOG :
            return {...state, catalog: action.payload}
        case FETCH_CATEGORY:
            return {...state, category: action.payload}
        case FETCH_PRODUCT:
            return {...state, product: action.payload}
        case FETCH_CART_PRODUCTS :
            return {...state, cartProducts: action.payload}
        case PRODUCT_LOADING:
            return {...state, productLoading: action.payload}
        default :
            return state;
    }
}