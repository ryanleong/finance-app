import _ from 'lodash';
import { DATA_REQUEST, DATA_REQUEST_SUCCESS, DATA_REQUEST_FAILURE } from './types';

import store from '../store';
import { db } from '../components/firebase';

const fetchData = () => async (dispatch) => {
    const state = store.getState();

    if (state.userData.transactions.length !== 0) return;

    if (state.userData.isFetching) return;

    dispatch({ type: DATA_REQUEST });

    const { uid } = state.authentication;

    try {
        const transactionDocs = await db.collection('users').doc(uid).collection('transactions')
            .orderBy('date', 'desc')
            .get();
        const transactionList = [];
        _.forEach(transactionDocs.docs, (transaction) => {
            const date = new Date(transaction.data().date.seconds * 1000);
            transactionList.push({
                ...transaction.data(),
                date,
                id: transaction.id,
            });
        });

        const accountDocs = await db.collection('users').doc(uid).collection('accounts').get();
        let accountList = [];
        accountDocs.docs.forEach((doc) => {
            accountList = { ...accountList, [doc.id]: doc.data() };
        });

        const categoryDocs = await db.collection('users').doc(uid).collection('categories').get();
        let categoryList = [];
        categoryDocs.docs.forEach((doc) => {
            categoryList = { ...categoryList, [doc.id]: doc.data() };
        });

        dispatch({
            type: DATA_REQUEST_SUCCESS,
            payload: {
                accounts: accountList,
                categories: categoryList,
                transactions: transactionList,
            },
        });
    } catch (e) {
        dispatch({
            type: DATA_REQUEST_FAILURE,
        });
    }
};

export default fetchData;
