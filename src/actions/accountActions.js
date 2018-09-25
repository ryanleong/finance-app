import { ADD_ACCOUNTS, FETCH_ACCOUNTS } from './types';

import { db } from '../firebase';

export const addAccounts = (data, id) => (dispatch) => {
    dispatch({
        type: ADD_ACCOUNTS,
        id,
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
                    [doc.id]: doc.data(),
                };
            });

            dispatch({
                type: FETCH_ACCOUNTS,
                payload: categoryList,
            });
        });
};
