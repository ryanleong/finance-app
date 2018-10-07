import { ADD_ACCOUNT, ADD_ACCOUNT_SUCCESS, ADD_ACCOUNT_FAILURE } from './types';

import store from '../store';
import { db } from '../components/firebase';

const addAccount = name => async (dispatch) => {
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

        // this.props.history.push('/accounts');
    } catch (e) {
        dispatch({
            type: ADD_ACCOUNT_FAILURE,
        });
    }
};

export default addAccount;
