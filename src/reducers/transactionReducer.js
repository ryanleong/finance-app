import {
    ADD_TRANSACTIONS, FETCH_TRANSACTIONS, FETCH_TRANSACTIONS_COUNT, START_FETCHING_TRANSACTIONS, END_FETCHING_TRANSACTIONS, START_FETCHING_TRANSACTIONS_COUNT, END_FETCHING_TRANSACTIONS_COUNT, SET_TRANSACTIONS_REQUIRE_UPDATE,
} from '../actions/types';

const initialState = {
    requireUpdate: true,
    transactionCount: -1,
    transactionTotalPages: -1,
    isFetchingTransactions: false,
    isFetchingTransactionsCount: false,
    transactionData: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
    case SET_TRANSACTIONS_REQUIRE_UPDATE:
    case ADD_TRANSACTIONS:
        return { ...initialState };

    case FETCH_TRANSACTIONS:
        return {
            ...state,
            requireUpdate: false,
            transactionData: [...state.transactionData, ...action.payload],
        };

    case FETCH_TRANSACTIONS_COUNT:
        return {
            ...state,
            requireUpdate: false,
            transactionCount: action.payload,
            transactionTotalPages: Math.ceil(action.payload / process.env.REACT_APP_TRANSACTIONS_PER_PAGE),
        };

    case START_FETCHING_TRANSACTIONS:
        return { ...state, isFetchingTransactions: true };

    case END_FETCHING_TRANSACTIONS:
        return { ...state, isFetchingTransactions: false };

    case START_FETCHING_TRANSACTIONS_COUNT:
        return { ...state, isFetchingTransactionsCount: true };

    case END_FETCHING_TRANSACTIONS_COUNT:
        return { ...state, isFetchingTransactionsCount: false };

    default:
        return state;
    }
}
