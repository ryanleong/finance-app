import { ADD_ACCOUNTS, FETCH_ACCOUNTS } from './types';

import { db } from '../firebase';

export const addAccounts = data => (dispatch) => {
    dispatch({
        type: ADD_ACCOUNTS,
        payload: data,
    });
};

export const fetchAccounts = uid => (dispatch) => {
    db.collection('users').doc(uid).collection('accounts').get()
        .then((results) => {
            let categoryList = {};

            results.docs.forEach((doc) => {
                categoryList = {
                    ...categoryList,
                    [doc.id]: '',
                };
            });

            dispatch({
                type: FETCH_ACCOUNTS,
                payload: categoryList,
            });
        });
};
