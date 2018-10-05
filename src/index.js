import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import store from './store';
import Auth from './components/authentication/Auth';
import Dashboard from './containers/Dashboard';
import Signup from './containers/authentication/Signup';
import Signin from './containers/authentication/Signin';
import Signout from './containers/authentication/Signout';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Switch>
                <Route exact path="/signup" component={Auth(Signup)} />
                <Route exact path="/signin" component={Auth(Signin)} />

                <Route exact path="/signout" component={Auth(Signout)} />
                <Route exact path="/dashboard" component={Auth(Dashboard)} />

                <Route component={() => <h1>404</h1>} />
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
