import {
    ADD_TRANSACTIONS, FETCH_TRANSACTIONS, FETCH_TRANSACTIONS_COUNT, START_FETCHING_TRANSACTIONS, END_FETCHING_TRANSACTIONS, START_FETCHING_TRANSACTIONS_COUNT, END_FETCHING_TRANSACTIONS_COUNT,
} from './types';

import store from '../store';
import { db } from '../firebase';


export const addTransaction = (uid, transactionCount, doc) => (dispatch) => {
    db.collection('users').doc(uid)
        .update({
            transactionCount: transactionCount + 1,
        })
        .then(() => {
            dispatch({
                type: ADD_TRANSACTIONS,
                payload: doc,
            });
        });
};

export const fetchTransactions = (uid, latestTransaction) => (dispatch) => {
    const perPage = parseInt(process.env.REACT_APP_TRANSACTIONS_PER_PAGE, 10);
    const state = store.getState();

    if (!state.transactions.isFetchingTransactions) {
        // Mark as fetching
        dispatch({ type: START_FETCHING_TRANSACTIONS });

        const execute = (docSnapshots) => {
            dispatch({
                type: FETCH_TRANSACTIONS,
                payload: docSnapshots.docs,
            });

            // Mark fetching as done
            dispatch({ type: END_FETCHING_TRANSACTIONS });
        };

        const query = db.collection('users').doc(uid).collection('transactions')
            .orderBy('date', 'desc');

        if (latestTransaction !== null) {
            query.startAfter(latestTransaction).limit(perPage).get().then(execute);
        } else {
            query.limit(perPage).get().then(execute);
        }
    }
};

export const fetchTransactionCount = uid => (dispatch) => {
    const state = store.getState();

    if (!state.transactions.isFetchingTransactionsCount) {
        // Mark as fetching
        dispatch({ type: START_FETCHING_TRANSACTIONS_COUNT });

        // Get total number of transactions
        db.collection('users').doc(uid)
            .get()
            .then((docSnapshots) => {
                dispatch({
                    type: FETCH_TRANSACTIONS_COUNT,
                    payload: docSnapshots.data().transactionCount,
                });

                // Mark fetching as done
                dispatch({ type: END_FETCHING_TRANSACTIONS_COUNT });
            });
    }
};
