import { combineReducers } from 'redux';

import authenticationReducer from './authenticationReducer';
// import accountReducer from './accountReducer';
// import categoryReducer from './categoryReducer';
// import transactionReducer from './transactionReducer';

export default combineReducers({
    authentication: authenticationReducer,
    // accounts: accountReducer,
    // categories: categoryReducer,
    // transactions: transactionReducer,
});
