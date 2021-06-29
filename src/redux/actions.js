import {FETCH_DATA, HIDE_LOADER, SET_OS, SHOW_LOADER} from "./types";
import data from '../data.json';

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

export const fetchData = () => {
    return {
        type: FETCH_DATA,
        payload: data
    }
}