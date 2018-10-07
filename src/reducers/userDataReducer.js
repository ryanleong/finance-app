import {
    DATA_REQUEST, DATA_REQUEST_SUCCESS, DATA_REQUEST_FAILURE, ADD_ACCOUNT, ADD_ACCOUNT_SUCCESS, ADD_ACCOUNT_FAILURE,
} from '../actions/types';

const initialState = {
    isFetching: false,
    isUpdatingAccount: false,
    hasFailed: false,
    accounts: {},
    categories: {},
    transactions: [],
};

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

    default:
        return state;
    }
}
