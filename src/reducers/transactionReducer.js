import { ADD_TRANSACTIONS, FETCH_TRANSACTIONS, FETCH_TRANSACTIONS_PAGES } from '../actions/types';

const initialState = {
    requireUpdate: true,
    transactionTotalPages: -1,
    transactionData: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
    case ADD_TRANSACTIONS:
        return {
            requireUpdate: false,
            transactionTotalPages: state.transactionTotalPages,
            transactionData: {
                ...state.transactionData,
                [action.payload.id]: action.payload.data,
            },
        };

    case FETCH_TRANSACTIONS:
        return {
            requireUpdate: false,
            transactionTotalPages: state.transactionTotalPages,
            transactionData: [...state.transactionData, ...action.payload],
        };

    case FETCH_TRANSACTIONS_PAGES:
        return {
            ...state,
            transactionTotalPages: action.payload,
        };

    default:
        return state;
    }
}
