import { ADD_TRANSACTION, ADD_TRANSACTION_SUCCESS, ADD_TRANSACTION_FAILURE } from './types';

import store from '../store';
import { db } from '../components/firebase';

const addTransaction = submitData => async (dispatch) => {
    const state = store.getState();
    const { uid } = state.authentication;

    if (state.userData.isUpdatingAccount) return;

    dispatch({ type: ADD_TRANSACTION });

    try {
        const addedAccountDoc = await db.collection('users').doc(uid).collection('transactions').add(submitData);

        dispatch({
            type: ADD_TRANSACTION_SUCCESS,
            payload: [
                {
                    ...submitData,
                    id: addedAccountDoc.id,
                },
            ],
        });
    } catch (e) {
        dispatch({
            type: ADD_TRANSACTION_FAILURE,
        });
    }
};

export default addTransaction;
