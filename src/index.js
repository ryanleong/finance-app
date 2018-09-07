import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import store from './store';
import Register from './containers/Register';
import Home from './containers/Home';
import './index.scss';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Switch>
                <Route path="/register" component={Register} />
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('root'),
);

registerServiceWorker();
