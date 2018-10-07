import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import AuthCheck from './components/authentication/AuthCheck';
import NoAuthCheck from './components/authentication/NoAuthCheck';
import Landing from './containers/Landing';
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
                    <Route exact path="/signup" component={NoAuthCheck(Signup)} />
                    <Route exact path="/signin" component={NoAuthCheck(Signin)} />

                    <Route exact path="/signout" component={Signout} />
                    <Route exact path="/dashboard" component={AuthCheck(Dashboard)} />

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
