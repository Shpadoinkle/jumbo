import {
    LISTS_LOADED
} from './types';
// import Cookies from 'js-cookie';

export const loadLists = (data) => {
    return {
        type: LISTS_LOADED,
        payload: data
    };
};
