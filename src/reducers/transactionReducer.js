import { FETCH_TRANSACTIONS } from '../actions/types';

const initialState = {};

export default function (state = initialState, action) {
    switch (action.type) {
    case FETCH_TRANSACTIONS:
        return { ...state, [action.payload.id]: action.payload };

    default:
        return state;
    }
}
