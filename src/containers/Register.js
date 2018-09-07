import React, { Component } from 'react';

import { auth, db } from '../firebase';

const INITIAL_STATE = {
    email: '',
    password: '',
    password2: '',
    error: null,
};

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = INITIAL_STATE;

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    async onSubmit(evt) {
        evt.preventDefault();

        const { email, password } = this.state;

        try {
            const authUser = await auth.createUserWithEmailAndPassword(email, password);

            // Create new db entry
            const newUser = db.collection('users').doc(authUser.user.uid);
            await newUser.set({});

            // TODO: Display registered notification

            // Redirect to login page
            this.props.history.push('/login');
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
                    <input type="password" placeholder="Confirm Password" name="password2" value={this.state.password2} onChange={this.onChange} />
                    <input type="submit" value="Register" />
                </form>
            </React.Fragment>
        );
    }
}

export default Register;
