import {
    DATA_REQUEST, DATA_REQUEST_SUCCESS, DATA_REQUEST_FAILURE, ADD_ACCOUNT, ADD_ACCOUNT_SUCCESS, ADD_ACCOUNT_FAILURE, ADD_CATEGORY, ADD_CATEGORY_SUCCESS, ADD_CATEGORY_FAILURE, ADD_TRANSACTION, ADD_TRANSACTION_SUCCESS, ADD_TRANSACTION_FAILURE,
} from '../actions/types';

const initialState = {
    isFetching: false,
    isUpdatingAccount: false,
    isUpdatingCategory: false,
    isUpdatingTransaction: false,
    hasFailed: false,
    accounts: {},
    categories: {},
    transactions: [],
};

const sortTransactionsDesc = transactions => transactions.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA;
});

export default function (state = initialState, action) {
    switch (action.type) {
    case DATA_REQUEST:
        return {
            ...state,
            isFetching: true,
            hasFailed: false,
        };

    case DATA_REQUEST_SUCCESS:
        return {
            ...state,
            isFetching: false,
            hasFailed: false,
            ...action.payload,
        };

    case DATA_REQUEST_FAILURE:
        return {
            ...state,
            isFetching: false,
            hasFailed: true,
        };

    case ADD_ACCOUNT:
        return {
            ...state,
            isUpdatingAccount: true,
            hasFailed: false,
        };

    case ADD_ACCOUNT_SUCCESS:
        return {
            ...state,
            isUpdatingAccount: false,
            hasFailed: false,
            accounts: {
                ...state.accounts,
                ...action.payload,
            },
        };

    case ADD_ACCOUNT_FAILURE:
        return {
            ...state,
            isUpdatingAccount: false,
            hasFailed: true,
        };

    case ADD_CATEGORY:
        return {
            ...state,
            isUpdatingCategory: true,
            hasFailed: false,
        };

    case ADD_CATEGORY_SUCCESS:
        return {
            ...state,
            isUpdatingCategory: false,
            hasFailed: false,
            categories: {
                ...state.categories,
                ...action.payload,
            },
        };

    case ADD_CATEGORY_FAILURE:
        return {
            ...state,
            isUpdatingCategory: false,
            hasFailed: true,
        };

    case ADD_TRANSACTION:
        return {
            ...state,
            isUpdatingTransaction: true,
            hasFailed: false,
        };

    case ADD_TRANSACTION_SUCCESS:
        return {
            ...state,
            isUpdatingTransaction: false,
            hasFailed: false,
            transactions: sortTransactionsDesc([
                ...state.transactions,
                ...action.payload,
            ]),
        };

    case ADD_TRANSACTION_FAILURE:
        return {
            ...state,
            isUpdatingTransaction: false,
            hasFailed: true,
        };

    default:
        return state;
    }
}
