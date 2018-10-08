import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
    Container, Row, Col, Form, FormGroup, Label, Input, Button,
} from 'reactstrap';

import { auth } from '../../components/firebase';
import updateAuthState from '../../actions/authenticationActions';
import Navigation from '../../components/Navigation';

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};

class Signin extends Component {
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
            // Signin user
            await auth.signInWithEmailAndPassword(email, password);

            // TODO: Display registered notification

            this.props.updateAuthState();
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
                <Navigation />

                <Container>
                    <Row>
                        <Col>
                            <h1>Sign in</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form onSubmit={this.onSubmit}>
                                <FormGroup>
                                    <Label for="email">Email</Label>
                                    <Input type="email" name="email" id="email" value={this.state.email} onChange={this.onChange} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="password">Password</Label>
                                    <Input type="password" name="password" id="password" value={this.state.password} onChange={this.onChange} />
                                </FormGroup>

                                <FormGroup>
                                    <Button color="primary">Sign in</Button>
                                </FormGroup>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </React.Fragment>
        );
    }
}

Signin.propTypes = {
    updateAuthState: PropTypes.func.isRequired,
    authentication: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    authentication: state.authentication,
});

export default connect(mapStateToProps, { updateAuthState })(Signin);
