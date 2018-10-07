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

        const accountDocs = await db.collection('users').doc(uid).collection('accounts').get();

        const categoryDocs = await db.collection('users').doc(uid).collection('categories').get();

        dispatch({
            type: DATA_REQUEST_SUCCESS,
            payload: {
                accounts: accountDocs.docs,
                categories: categoryDocs.docs,
                transactions: transactionDocs.docs,
            },
        });
    } catch (e) {
        dispatch({
            type: DATA_REQUEST_FAILURE,
        });
    }
};

export default fetchData;
