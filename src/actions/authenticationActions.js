import { UPDATE_AUTH_STATE } from './types';

const updateAuthState = authUser => (dispatch) => {
    dispatch({
        type: UPDATE_AUTH_STATE,
        payload: authUser || {},
    });
};

export default updateAuthState;
