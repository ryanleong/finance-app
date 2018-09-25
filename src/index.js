import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import store from './store';
import Auth from './HOC/Auth';

import Register from './containers/Register';
import Signin from './containers/Signin';
import Signout from './containers/Signout';
import Home from './containers/Home';
import Dashboard from './containers/Dashboard';
import Transactions from './containers/transactions/Transactions';
import TransactionsAdd from './containers/transactions/TransactionsAdd';
import TransactionsEdit from './containers/transactions/TransactionsEdit';
import CategoryAdd from './containers/categories/CategoryAdd';
import CategoryEdit from './containers/categories/CategoryEdit';
import Category from './containers/categories/Category';
import AccountsAdd from './containers/accounts/AccountsAdd';
import Accounts from './containers/accounts/Accounts';
import './index.scss';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Switch>
                <Route path="/register" component={Auth(Register)} />
                <Route path="/signin" component={Auth(Signin)} />
                <Route path="/signout" component={Auth(Signout)} />

                <Route path="/dashboard" component={Auth(Dashboard)} />

                <Route path="/transactions/add" component={Auth(TransactionsAdd)} />
                <Route path="/transactions/edit" component={Auth(TransactionsEdit)} />
                <Route path="/transactions" component={Auth(Transactions)} />

                <Route path="/categories/edit/:id" component={Auth(CategoryEdit)} />
                <Route path="/categories/add" component={Auth(CategoryAdd)} />
                <Route path="/categories" component={Auth(Category)} />

                <Route path="/accounts/add" component={Auth(AccountsAdd)} />
                <Route path="/accounts" component={Auth(Accounts)} />

                <Route path="/" component={Auth(Home)} />
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('root'),
);

registerServiceWorker();
