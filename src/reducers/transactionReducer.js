import _ from 'lodash';
import { ADD_TRANSACTIONS, FETCH_TRANSACTIONS } from '../actions/types';

const initialState = {
    requireUpdate: true,
    transactions: {},
};

export default function (state = initialState, action) {
    switch (action.type) {
    case ADD_TRANSACTIONS:
        return _.merge(state, {
            requireUpdate: false,
            transactions: {
                [action.payload.id]: action.payload.data,
            },
        });

    case FETCH_TRANSACTIONS:
        return _.merge(state, {
            requireUpdate: false,
            transactions: action.payload,
        });

    default:
        return state;
    }
}
