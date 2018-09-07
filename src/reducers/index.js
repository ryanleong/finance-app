import { combineReducers } from 'redux';

import accountReducer from './accountReducer';
import categoryReducer from './categoryReducer';
import transactionReducer from './transactionReducer';

export default combineReducers({
    accounts: accountReducer,
    categories: categoryReducer,
    transactions: transactionReducer,
});
