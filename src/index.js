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
import AccountsEdit from './containers/accounts/AccountsEdit';
import Accounts from './containers/accounts/Accounts';
import './index.scss';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Switch>
                <Route exact path="/register" component={Auth(Register)} />
                <Route exact path="/signin" component={Auth(Signin)} />
                <Route exact path="/signout" component={Auth(Signout)} />

                <Route exact path="/dashboard" component={Auth(Dashboard)} />

                <Route exact path="/transactions/add" component={Auth(TransactionsAdd)} />
                <Route path="/transactions/edit/:id" component={Auth(TransactionsEdit)} />
                <Route exact path="/transactions" component={Auth(Transactions)} />

                <Route path="/categories/edit/:id" component={Auth(CategoryEdit)} />
                <Route exact path="/categories/add" component={Auth(CategoryAdd)} />
                <Route exact path="/categories" component={Auth(Category)} />

                <Route path="/accounts/edit/:id" component={Auth(AccountsEdit)} />
                <Route exact path="/accounts/add" component={Auth(AccountsAdd)} />
                <Route exact path="/accounts" component={Auth(Accounts)} />

                <Route exact path="/" component={Auth(Home)} />

                <Route component={() => <h1>404</h1>} />
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('root'),
);

registerServiceWorker();
