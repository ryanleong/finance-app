import {
    ADD_ACCOUNT, ADD_ACCOUNT_SUCCESS, ADD_ACCOUNT_FAILURE, EDIT_ACCOUNT, EDIT_ACCOUNT_SUCCESS, EDIT_ACCOUNT_FAILURE,
} from './types';

import store from '../store';
import { db } from '../components/firebase';

export const addAccount = name => async (dispatch) => {
    const state = store.getState();
    const { uid } = state.authentication;

    if (state.userData.isUpdatingAccount) return;

    dispatch({ type: ADD_ACCOUNT });

    try {
        const addedAccountDoc = await db.collection('users').doc(uid).collection('accounts')
            .add({
                name,
            });

        dispatch({
            type: ADD_ACCOUNT_SUCCESS,
            payload: {
                [addedAccountDoc.id]: { name },
            },
        });
    } catch (e) {
        dispatch({
            type: ADD_ACCOUNT_FAILURE,
        });
    }
};

export const editAccount = (name, accountId) => async (dispatch) => {
    const state = store.getState();
    const { uid } = state.authentication;

    if (state.userData.isUpdatingAccount) return;

    dispatch({ type: EDIT_ACCOUNT });

    try {
        await db.collection('users').doc(uid).collection('accounts').doc(accountId)
            .update({
                name,
            });

        dispatch({
            type: EDIT_ACCOUNT_SUCCESS,
            payload: {
                [accountId]: { name },
            },
        });
    } catch (e) {
        dispatch({
            type: EDIT_ACCOUNT_FAILURE,
        });
    }
};
