import { ADD_TRANSACTIONS, FETCH_TRANSACTIONS } from '../actions/types';

const initialState = {
    requireUpdate: true,
    transactionData: {},
};

export default function (state = initialState, action) {
    switch (action.type) {
    case ADD_TRANSACTIONS:
        return {
            requireUpdate: false,
            transactionData: {
                ...state.transactionData,
                [action.payload.id]: action.payload.data,
            },
        };

    case FETCH_TRANSACTIONS:
        return {
            requireUpdate: false,
            transactionData: {
                ...action.payload,
            },
        };

    default:
        return state;
    }
}
