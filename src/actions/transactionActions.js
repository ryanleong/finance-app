import { ADD_TRANSACTIONS } from './types';

const addTransaction = data => (dispatch) => {
    dispatch({
        type: ADD_TRANSACTIONS,
        payload: data,
    });
};

export default addTransaction;
