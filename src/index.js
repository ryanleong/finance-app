import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import store from './store';
import Dashboard from './containers/Dashboard';
import Signup from './containers/authentication/Signup';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Switch>
                <Route exact path='/signup' component={Signup} />
                <Route exact path='/' component={Dashboard} />
            </Switch>
        </Router>
    </Provider>
    , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
