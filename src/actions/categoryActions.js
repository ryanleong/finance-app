import _ from 'lodash';

import {
    ADD_CATEGORY, EDIT_CATEGORY, FETCH_CATEGORIES, START_FETCH_CATEGORIES, END_FETCH_CATEGORIES,
} from './types';

import store from '../store';
import { db } from '../firebase';

export const addCategory = (data, id) => (dispatch) => {
    dispatch({
        type: ADD_CATEGORY,
        id,
        payload: data,
    });
};

export const editCategory = (data, id) => (dispatch) => {
    dispatch({
        type: EDIT_CATEGORY,
        id,
        payload: data,
    });
};

export const fetchCategory = uid => (dispatch) => {
    const state = store.getState();

    // Check for auth
    if (state.authentication.uid === undefined) return;

    // If no category data and not currently fetching
    if (_.isEmpty(state.categories.categoryData) && !state.categories.isFetchingCategories) {
        // Mark as fetching
        dispatch({ type: START_FETCH_CATEGORIES });

        db.collection('users').doc(uid).collection('categories').get()
            .then((results) => {
                let categoryList = {};

                results.docs.forEach((doc) => {
                    categoryList = {
                        ...categoryList,
                        [doc.id]: doc.data(),
                    };
                });

                dispatch({
                    type: FETCH_CATEGORIES,
                    payload: categoryList,
                });

                // Mark fetching as done
                dispatch({ type: END_FETCH_CATEGORIES });
            });
    }
};
