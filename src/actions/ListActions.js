import {
    LISTS_LOADED,
    POPULAR_LOADED,
} from './types';
// import Cookies from 'js-cookie';

export const loadLists = (data) => {
    return {
        type: LISTS_LOADED,
        payload: data
    };
};

export const loadPop = (data) => {
    return {
        type: POPULAR_LOADED,
        payload: data
    };
};