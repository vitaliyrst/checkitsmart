export const getOs = (state) => {
    return state.app.os;
}

export const getHeight = (state) => {
    return state.app.height;
}

export const getLoading = (state) => {
    return state.app.loading;
}

export const getCatalog = (state) => {
    return state.catalog.catalog;

}

export const getCartState = (state) => {
    return state.app.isCart;
}

export const getMatrix = (state) => {
    return state.webxr.matrix;
}