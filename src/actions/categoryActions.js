import { ADD_CATEGORY, EDIT_CATEGORY, FETCH_CATEGORIES } from './types';

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
        });
};
