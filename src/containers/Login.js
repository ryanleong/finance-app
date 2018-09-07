import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { auth } from '../firebase';
import updateAuthState from '../actions/authenticationActions';

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = INITIAL_STATE;

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidUpdate() {
        if (!_.isEmpty(this.props.authentication)) {
            this.props.history.push('/dashboard');
        }
    }

    async onSubmit(evt) {
        evt.preventDefault();

        const { email, password } = this.state;

        this.setState({ ...INITIAL_STATE });

        try {
            // TODO: login user
            const authUser = await auth.signInWithEmailAndPassword(email, password);

            this.setState({ ...INITIAL_STATE });

            // TODO: Display registered notification

            this.props.updateAuthState(authUser.user);

            // Redirect to login page
            this.props.history.push('/dashboard');
        } catch (error) {
            this.setState({ error });
        }
    }

    onChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value,
        });
    }

    render() {
        return (
            <React.Fragment>
                <form onSubmit={this.onSubmit}>
                    <input type="email" placeholder="Email" name="email" value={this.state.email} onChange={this.onChange} />
                    <input type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.onChange} />
                    <input type="submit" value="Login" />
                </form>
            </React.Fragment>
        );
    }
}

Login.propTypes = {
    updateAuthState: PropTypes.func.isRequired,
    authentication: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    authentication: state.authentication,
});

export default connect(mapStateToProps, { updateAuthState })(Login);
