import { ADD_CATEGORY, ADD_CATEGORY_SUCCESS, ADD_CATEGORY_FAILURE } from './types';

import store from '../store';
import { db } from '../components/firebase';

const addCategory = name => async (dispatch) => {
    const state = store.getState();
    const { uid } = state.authentication;

    if (state.userData.isUpdatingCategory) return;

    dispatch({ type: ADD_CATEGORY });

    try {
        const addedCategoryDoc = await db.collection('users').doc(uid).collection('categories')
            .add({
                name,
            });

        dispatch({
            type: ADD_CATEGORY_SUCCESS,
            payload: {
                [addedCategoryDoc.id]: { name },
            },
        });
    } catch (e) {
        dispatch({
            type: ADD_CATEGORY_FAILURE,
        });
    }
};

export default addCategory;
