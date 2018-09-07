import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import store from './store';
import Auth from './HOC/Auth';

import Register from './containers/Register';
import Login from './containers/Login';
import Home from './containers/Home';
import './index.scss';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Switch>
                <Route path="/register" component={Auth(Register)} />
                <Route path="/login" component={Auth(Login)} />
                <Route path="/" component={Auth(Home)} />
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('root'),
);

registerServiceWorker();
