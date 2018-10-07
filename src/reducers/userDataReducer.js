import _ from 'lodash';
import {
    DATA_REQUEST, DATA_REQUEST_SUCCESS, DATA_REQUEST_FAILURE, ADD_ACCOUNT, ADD_ACCOUNT_SUCCESS, ADD_ACCOUNT_FAILURE, ADD_CATEGORY, ADD_CATEGORY_SUCCESS, ADD_CATEGORY_FAILURE, ADD_TRANSACTION, ADD_TRANSACTION_SUCCESS, ADD_TRANSACTION_FAILURE, EDIT_ACCOUNT, EDIT_ACCOUNT_SUCCESS, EDIT_ACCOUNT_FAILURE, EDIT_CATEGORY, EDIT_CATEGORY_SUCCESS, EDIT_CATEGORY_FAILURE, EDIT_TRANSACTION, EDIT_TRANSACTION_SUCCESS, EDIT_TRANSACTION_FAILURE, DELETE_TRANSACTION, DELETE_TRANSACTION_SUCCESS, DELETE_TRANSACTION_FAILURE, DELETE_CATEGORY, DELETE_CATEGORY_SUCCESS, DELETE_CATEGORY_FAILURE,
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

const replaceInArray = (transactionList, transaction) => {
    // Find item index
    const index = _.findIndex(transactionList, tran => tran.id === transaction.id);

    // Replace transaction is found
    if (index !== -1) {
        const returnList = [...transactionList];
        returnList[index] = transaction;
        return returnList;
    }

    return transactionList;
};

const sortTransactionsDesc = transactions => transactions.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA;
});

export default function (state = initialState, action) {
    const categories = { ...state.categories };

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
    case EDIT_ACCOUNT:
        return {
            ...state,
            isUpdatingAccount: true,
            hasFailed: false,
        };

    case ADD_ACCOUNT_SUCCESS:
    case EDIT_ACCOUNT_SUCCESS:
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
    case EDIT_ACCOUNT_FAILURE:
        return {
            ...state,
            isUpdatingAccount: false,
            hasFailed: true,
        };

    case ADD_CATEGORY:
    case EDIT_CATEGORY:
    case DELETE_CATEGORY:
        return {
            ...state,
            isUpdatingCategory: true,
            hasFailed: false,
        };

    case ADD_CATEGORY_SUCCESS:
    case EDIT_CATEGORY_SUCCESS:
        return {
            ...state,
            isUpdatingCategory: false,
            hasFailed: false,
            categories: {
                ...categories,
                ...action.payload,
            },
        };

    case DELETE_CATEGORY_SUCCESS:
        delete categories[action.payload];

        return {
            ...state,
            isUpdatingCategory: false,
            hasFailed: false,
            categories: {
                ...categories,
            },
        };

    case ADD_CATEGORY_FAILURE:
    case EDIT_CATEGORY_FAILURE:
    case DELETE_CATEGORY_FAILURE:
        return {
            ...state,
            isUpdatingCategory: false,
            hasFailed: true,
        };

    case ADD_TRANSACTION:
    case EDIT_TRANSACTION:
    case DELETE_TRANSACTION:
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

    case EDIT_TRANSACTION_SUCCESS:
        return {
            ...state,
            isUpdatingTransaction: false,
            hasFailed: false,
            transactions: sortTransactionsDesc(replaceInArray(state.transactions, action.payload)),
        };

    case DELETE_TRANSACTION_SUCCESS:
        return {
            ...state,
            isUpdatingTransaction: false,
            hasFailed: false,
            transactions: _.remove(state.transactions, transaction => transaction.id !== action.payload),
        };

    case ADD_TRANSACTION_FAILURE:
    case EDIT_TRANSACTION_FAILURE:
    case DELETE_TRANSACTION_FAILURE:
        return {
            ...state,
            isUpdatingTransaction: false,
            hasFailed: true,
        };

    default:
        return state;
    }
}
