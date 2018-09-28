import _ from 'lodash';

import {
    ADD_ACCOUNTS, EDIT_ACCOUNTS, FETCH_ACCOUNTS, START_FETCH_ACCOUNTS, END_FETCH_ACCOUNTS,
} from './types';

import store from '../store';
import { db } from '../firebase';

export const addAccounts = (data, id) => (dispatch) => {
    dispatch({
        type: ADD_ACCOUNTS,
        id,
        payload: data,
    });
};

export const editAccounts = (data, id) => (dispatch) => {
    dispatch({
        type: EDIT_ACCOUNTS,
        id,
        payload: data,
    });
};

export const fetchAccounts = uid => (dispatch) => {
    const state = store.getState();

    // Check for auth
    if (state.authentication.uid === undefined) return;

    // If no account data and not currently fetching
    if (_.isEmpty(state.accounts.accountData) && !state.accounts.isFetchingAccounts) {
        // Mark as fetching
        dispatch({ type: START_FETCH_ACCOUNTS });

        db.collection('users').doc(uid).collection('accounts').get()
            .then((results) => {
                let categoryList = {};

                results.docs.forEach((doc) => {
                    categoryList = {
                        ...categoryList,
                        [doc.id]: doc.data(),
                    };
                });

                dispatch({
                    type: FETCH_ACCOUNTS,
                    payload: categoryList,
                });

                // Mark fetching as done
                dispatch({ type: END_FETCH_ACCOUNTS });
            });
    }
};
