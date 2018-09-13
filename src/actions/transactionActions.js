import { ADD_TRANSACTIONS, FETCH_TRANSACTIONS } from './types';

import { db } from '../firebase';

export const addTransaction = data => (dispatch) => {
    dispatch({
        type: ADD_TRANSACTIONS,
        payload: data,
    });
};

export const fetchTransactions = uid => (dispatch) => {
    db.collection('users').doc(uid).collection('transactions')
        .orderBy('date', 'desc')
        // .startAt('2018-09-13')
        .limit(10)
        .get()
        .then((docSnapshots) => {
            const transactions = {};
            console.log('did call');

            docSnapshots.docs.forEach((doc) => {
                transactions[doc.id] = doc.data();
            });

            dispatch({
                type: FETCH_TRANSACTIONS,
                payload: transactions,
            });
        });
};
