import { ADD_ACCOUNTS, FETCH_ACCOUNTS } from '../actions/types';

const initialState = {};

export default function (state = initialState, action) {
    switch (action.type) {
    case ADD_ACCOUNTS:
        return { ...state, [action.id]: action.payload };

    case FETCH_ACCOUNTS:
        return { ...action.payload };

    default:
        return state;
    }
}
