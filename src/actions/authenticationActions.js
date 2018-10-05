import { UPDATE_AUTH_STATE } from './types';

import { firebase } from '../components/firebase';

const updateAuthState = () => (dispatch) => {
    firebase.auth().onAuthStateChanged((user) => {
        dispatch({
            type: UPDATE_AUTH_STATE,
            payload: user || null,
        });
    });
};

export default updateAuthState;
