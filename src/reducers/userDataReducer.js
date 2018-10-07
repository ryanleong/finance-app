import { DATA_REQUEST, DATA_REQUEST_SUCCESS, DATA_REQUEST_FAILURE } from '../actions/types';

const initialState = {
    isFetching: false,
    hasFailed: false,
    accounts: [],
    categories: [],
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

    default:
        return state;
    }
}
