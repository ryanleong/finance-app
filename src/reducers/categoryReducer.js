import { ADD_CATEGORY } from '../actions/types';

const initialState = {};

export default function (state = initialState, action) {
    switch (action.type) {
    case ADD_CATEGORY:
        return { ...state, [action.payload.name]: action.payload.description };

    default:
        return state;
    }
}
