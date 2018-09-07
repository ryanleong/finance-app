import { combineReducers } from 'redux';

import accountReducer from './accountReducer';
import authenticationReducer from './authenticationReducer';
import categoryReducer from './categoryReducer';
import transactionReducer from './transactionReducer';

export default combineReducers({
    accounts: accountReducer,
    authentication: authenticationReducer,
    categories: categoryReducer,
    transactions: transactionReducer,
});
