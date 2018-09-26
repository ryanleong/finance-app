import { ADD_TRANSACTIONS, FETCH_TRANSACTIONS, FETCH_TRANSACTIONS_PAGES } from './types';

import { db } from '../firebase';

export const addTransaction = data => (dispatch) => {
    dispatch({
        type: ADD_TRANSACTIONS,
        payload: data,
    });
};

export const fetchTransactions = (uid, latestTransaction) => (dispatch) => {
    const perPage = parseInt(process.env.REACT_APP_TRANSACTIONS_PER_PAGE, 10);

    const execute = (docSnapshots) => {
        dispatch({
            type: FETCH_TRANSACTIONS,
            payload: docSnapshots.docs,
        });
    };

    const query = db.collection('users').doc(uid).collection('transactions')
        .orderBy('date', 'desc');

    if (latestTransaction !== null) {
        query.startAfter(latestTransaction).limit(perPage).get().then(execute);
    } else {
        query.limit(perPage).get().then(execute);
    }
};

export const fetchTransactionPages = uid => (dispatch) => {
    // Get total number of transactions
    db.collection('users').doc(uid)
        .get()
        .then((docSnapshots) => {
            dispatch({
                type: FETCH_TRANSACTIONS_PAGES,
                payload: Math.ceil(docSnapshots.data().transactionCount / process.env.REACT_APP_TRANSACTIONS_PER_PAGE),
            });
        });
};
