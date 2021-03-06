import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import AuthCheck from './components/authentication/AuthCheck';
import NoAuthCheck from './components/authentication/NoAuthCheck';

import Signup from './containers/authentication/Signup';
import Signin from './containers/authentication/Signin';
import Signout from './containers/authentication/Signout';

import Landing from './containers/Landing';
import Dashboard from './containers/Dashboard';
import Transactions from './containers/transactions/Transactions';
import TransactionsAdd from './containers/transactions/TransactionsAdd';
import TransactionsEdit from './containers/transactions/TransactionsEdit';
import Categories from './containers/categories/Categories';
import CategoriesAdd from './containers/categories/CategoriesAdd';
import CategoriesEdit from './containers/categories/CategoriesEdit';
import Accounts from './containers/accounts/Accounts';
import AccountsAdd from './containers/accounts/AccountsAdd';
import AccountsEdit from './containers/accounts/AccountsEdit';

import updateAuthState from './actions/authenticationActions';

class App extends Component {
    componentWillMount() {
        this.props.updateAuthState();
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/signup" component={NoAuthCheck(Signup)} />
                    <Route exact path="/signin" component={NoAuthCheck(Signin)} />

                    <Route exact path="/signout" component={Signout} />
                    <Route exact path="/dashboard" component={AuthCheck(Dashboard)} />

                    <Route exact path="/transactions/add" component={AuthCheck(TransactionsAdd)} />
                    <Route path="/transactions/edit/:id" component={AuthCheck(TransactionsEdit)} />
                    <Route exact path="/transactions" component={AuthCheck(Transactions)} />

                    <Route exact path="/categories/add" component={AuthCheck(CategoriesAdd)} />
                    <Route path="/categories/edit/:id" component={AuthCheck(CategoriesEdit)} />
                    <Route exact path="/categories" component={AuthCheck(Categories)} />

                    <Route exact path="/accounts/add" component={AuthCheck(AccountsAdd)} />
                    <Route path="/accounts/edit/:id" component={AuthCheck(AccountsEdit)} />
                    <Route exact path="/accounts" component={AuthCheck(Accounts)} />

                    <Route exact path="/" component={Landing} />

                    <Route component={() => <h1>404</h1>} />
                </Switch>
            </Router>
        );
    }
}

App.propTypes = {
    updateAuthState: PropTypes.func.isRequired,
};

export default connect(null, { updateAuthState })(App);
