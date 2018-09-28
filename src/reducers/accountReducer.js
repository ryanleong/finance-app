import {
    ADD_ACCOUNTS, EDIT_ACCOUNTS, FETCH_ACCOUNTS, START_FETCH_ACCOUNTS, END_FETCH_ACCOUNTS,
} from '../actions/types';

const initialState = {
    accountData: {},
    isFetchingAccounts: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
    case ADD_ACCOUNTS:
    case EDIT_ACCOUNTS:
        return {
            ...state,
            accountData: {
                ...state.accountData,
                [action.id]: action.payload,
            },
        };

    case FETCH_ACCOUNTS:
        return {
            ...state,
            accountData: {
                ...action.payload,
            },
        };

    case START_FETCH_ACCOUNTS:
        return { ...state, isFetchingAccounts: true };

    case END_FETCH_ACCOUNTS:
        return { ...state, isFetchingAccounts: false };

    default:
        return state;
    }
}
