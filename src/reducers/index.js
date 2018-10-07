import { combineReducers } from 'redux';

import authenticationReducer from './authenticationReducer';
import userDataReducer from './userDataReducer';

export default combineReducers({
    authentication: authenticationReducer,
    userData: userDataReducer,
});
