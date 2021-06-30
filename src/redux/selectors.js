export const getOs = (state) => {
    return state.app.os;
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