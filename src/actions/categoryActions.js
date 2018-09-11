import { ADD_CATEGORY, FETCH_CATEGORIES } from './types';

export const addCategory = data => (dispatch) => {
    dispatch({
        type: ADD_CATEGORY,
        payload: data,
    });
};

export const fetchCategory = categoryList => (dispatch) => {
    dispatch({
        type: FETCH_CATEGORIES,
        payload: categoryList,
    });
};
