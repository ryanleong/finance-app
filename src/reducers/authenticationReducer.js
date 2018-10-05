import { UPDATE_AUTH_STATE } from '../actions/types';

const initialState = {};

export default function (state = initialState, action) {
    switch (action.type) {
    case UPDATE_AUTH_STATE:
        return { ...action.payload };

    default:
        return state;
    }
}
