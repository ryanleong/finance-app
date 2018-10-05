/* eslint no-underscore-dangle: 0 */

import { createStore, applyMiddleware, compose } from 'redux';
// import thunk from 'redux-thunk';

import rootReducer from './reducers';

const initialState = {};

// List of Middlewards
const middleware = [];

const reduxDebugger = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development')
    ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    : f => f;

const store = createStore(
    rootReducer,
    initialState,
    compose(
        applyMiddleware(...middleware),
        reduxDebugger, // For Redux DevTools in Chrome
    ),
);

export default store;
