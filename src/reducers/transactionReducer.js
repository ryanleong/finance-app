import { ADD_TRANSACTIONS, FETCH_TRANSACTIONS, FETCH_TRANSACTIONS_PAGES } from '../actions/types';

const initialState = {
    requireUpdate: true,
    transactionCount: -1,
    transactionTotalPages: -1,
    transactionData: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
    case ADD_TRANSACTIONS:
        return {
            ...initialState,
            // transactionData: [...state.transactionData, action.payload],
        };

    case FETCH_TRANSACTIONS:
        return {
            requireUpdate: false,
            transactionCount: state.transactionCount,
            transactionTotalPages: state.transactionTotalPages,
            transactionData: [...state.transactionData, ...action.payload],
        };

    case FETCH_TRANSACTIONS_PAGES:
        return {
            ...state,
            requireUpdate: false,
            transactionCount: action.payload,
            transactionTotalPages: Math.ceil(action.payload / process.env.REACT_APP_TRANSACTIONS_PER_PAGE),
        };

    default:
        return state;
    }
}
