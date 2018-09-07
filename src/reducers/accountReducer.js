import { FETCH_ACCOUNTS } from '../actions/types';

const initialState = {};

export default function (state = initialState, action) {
    switch (action.type) {
    case FETCH_ACCOUNTS:
        return { ...state, [action.payload.id]: action.payload };

    default:
        return state;
    }
}
