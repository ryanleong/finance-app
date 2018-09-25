import { ADD_CATEGORY, FETCH_CATEGORIES } from '../actions/types';

const initialState = {};

export default function (state = initialState, action) {
    switch (action.type) {
    case ADD_CATEGORY:
        return { ...state, [action.id]: action.payload };

    case FETCH_CATEGORIES:
        return { ...action.payload };

    default:
        return state;
    }
}
