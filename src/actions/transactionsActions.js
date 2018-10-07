import {
    ADD_TRANSACTION, ADD_TRANSACTION_SUCCESS, ADD_TRANSACTION_FAILURE, EDIT_TRANSACTION, EDIT_TRANSACTION_SUCCESS, EDIT_TRANSACTION_FAILURE, DELETE_TRANSACTION, DELETE_TRANSACTION_SUCCESS, DELETE_TRANSACTION_FAILURE,
} from './types';

import store from '../store';
import { db } from '../components/firebase';

export const addTransaction = submitData => async (dispatch) => {
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

export const editTransaction = (submitData, transactionId) => async (dispatch) => {
    const state = store.getState();
    const { uid } = state.authentication;

    if (state.userData.isUpdatingAccount) return;

    dispatch({ type: EDIT_TRANSACTION });

    try {
        await db.collection('users').doc(uid).collection('transactions').doc(transactionId)
            .update(submitData);

        dispatch({
            type: EDIT_TRANSACTION_SUCCESS,
            payload: {
                ...submitData,
                id: transactionId,
            },
        });
    } catch (e) {
        dispatch({
            type: EDIT_TRANSACTION_FAILURE,
        });
    }
};

export const deleteTransaction = transactionId => async (dispatch) => {
    const state = store.getState();
    const { uid } = state.authentication;

    if (state.userData.isUpdatingAccount) return;

    dispatch({ type: DELETE_TRANSACTION });

    try {
        await db.collection('users').doc(uid).collection('transactions').doc(transactionId)
            .delete();

        dispatch({
            type: DELETE_TRANSACTION_SUCCESS,
            payload: transactionId,
        });
    } catch (e) {
        dispatch({
            type: DELETE_TRANSACTION_FAILURE,
        });
    }
};
