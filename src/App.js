import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Auth from './components/authentication/Auth';
import Dashboard from './containers/Dashboard';
import Signup from './containers/authentication/Signup';
import Signin from './containers/authentication/Signin';
import Signout from './containers/authentication/Signout';
import updateAuthState from './actions/authenticationActions';

class App extends Component {
    componentWillMount() {
        this.props.updateAuthState();
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/signup" component={Auth(Signup)} />
                    <Route exact path="/signin" component={Auth(Signin)} />

                    <Route exact path="/signout" component={Auth(Signout)} />
                    <Route exact path="/dashboard" component={Auth(Dashboard)} />

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
