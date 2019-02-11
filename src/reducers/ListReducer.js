import {
    POPULAR_LOADED,
    LISTS_LOADED,
    GENERAL_RESET
} from '../actions/types';

const INITIAL_STATE = {
    popular: [],
    list: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case POPULAR_LOADED:
            return {
                ...state,
                popular: action.payload
            };
        case LISTS_LOADED:
            return {
                ...state,
                list: action.payload
            };
        case GENERAL_RESET:
            return INITIAL_STATE;
        default:
            return state;
    }
};
