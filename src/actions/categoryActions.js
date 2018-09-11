import { ADD_CATEGORY } from './types';

const addCategory = data => (dispatch) => {
    dispatch({
        type: ADD_CATEGORY,
        payload: data,
    });
};

export default addCategory;
