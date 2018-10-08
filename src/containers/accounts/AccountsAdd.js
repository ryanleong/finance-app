import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    Container, Row, Col, Form, FormGroup, Label, Input, Button,
} from 'reactstrap';

import Navigation from '../../components/Navigation';
import fetchData from '../../actions/userDataActions';
import { addAccount } from '../../actions/accountsActions';

const INITIAL_STATE = {
    name: '',
};

class AccountsAdd extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        this.props.fetchData();
    }

    componentDidUpdate(prevProps) {
        // Redirect if successfully added
        if (prevProps.userData.isUpdatingAccount && !prevProps.userData.hasFailed
            && !this.props.userData.isUpdatingAccount && !this.props.userData.hasFailed) {
            this.props.history.push('/accounts');
        }
    }

    onChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value,
        });
    }

    onSubmit(evt) {
        evt.preventDefault();
        this.props.addAccount(this.state.name);
    }

    render() {
        return (
            <React.Fragment>
                <Navigation />
                <Container>
                    <Row>
                        <Col>
                            <h1>Add Account</h1>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form onSubmit={this.onSubmit}>
                                <FormGroup>
                                    <Label for="name">Account Name</Label>
                                    <Input type="text" name="name" value={this.state.name} onChange={this.onChange} />
                                </FormGroup>
                                <FormGroup>
                                    <Button color="primary">Submit</Button>
                                </FormGroup>
                            </Form>
                        </Col>
                    </Row>

                </Container>
            </React.Fragment>
        );
    }
}

AccountsAdd.propTypes = {
    fetchData: PropTypes.func.isRequired,
    addAccount: PropTypes.func.isRequired,
    userData: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    userData: state.userData,
});

export default connect(mapStateToProps, { fetchData, addAccount })(AccountsAdd);
