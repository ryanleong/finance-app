import { ADD_TRANSACTIONS } from '../actions/types';

const initialState = {};

export default function (state = initialState, action) {
    switch (action.type) {
    case ADD_TRANSACTIONS:
        return { ...state, [action.payload.id]: action.payload.data };

    default:
        return state;
    }
}
