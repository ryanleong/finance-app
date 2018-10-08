import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
    Container, Row, Col, Button,
} from 'reactstrap';

import Navigation from '../../components/Navigation';
import TransactionsForm from '../../components/transactions/TransactionsForm';
import fetchData from '../../actions/userDataActions';
import { addTransaction } from '../../actions/transactionsActions';

const INITIAL_STATE = {
    name: '',
    amount: '',
    date: '',
    category: '-1',
    account: '-1',
    description: '',
    debitOrCredit: 'expense',
};

class TransactionsAdd extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ...INITIAL_STATE,
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        this.props.fetchData();
    }

    componentDidUpdate(prevProps) {
        // Redirect if successfully added
        if (prevProps.userData.isUpdatingTransaction && !prevProps.userData.hasFailed
            && !this.props.userData.isUpdatingTransaction && !this.props.userData.hasFailed) {
            this.props.history.push('/transactions');
        }
    }

    onSubmit(evt) {
        evt.preventDefault();

        const submitData = { ...this.state };

        _.each(submitData, (item, key) => {
            if (item === '' || item === '-1') delete submitData[key];
        });

        // Set debit or credit
        if (this.state.debitOrCredit === 'expense') {
            submitData.amount = parseFloat(-Math.abs(submitData.amount));
        } else {
            submitData.amount = parseFloat(Math.abs(submitData.amount));
        }
        submitData.date = new Date(submitData.date);


        delete submitData.debitOrCredit;

        this.props.addTransaction(submitData);
    }

    onChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value,
        });
    }

    render() {
        let bodyContent = <TransactionsForm onSubmit={this.onSubmit} onChange={this.onChange} state={this.state} userData={this.props.userData} />;


        if (this.props.userData.accounts.length === 0) {
            bodyContent = (
                <React.Fragment>
                    <h4>Please create account before adding transaction</h4>
                    <Button color="primary" tag={Link} to="/accounts/add">Create Account</Button>
                </React.Fragment>
            );
        }

        return (
            <React.Fragment>
                <Navigation />

                <Container>
                    <Row>
                        <Col>
                            <h1>Add Transactions</h1>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            {bodyContent}
                        </Col>
                    </Row>

                </Container>
            </React.Fragment>
        );
    }
}

TransactionsAdd.propTypes = {
    fetchData: PropTypes.func.isRequired,
    addTransaction: PropTypes.func.isRequired,
    userData: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    userData: state.userData,
});

export default connect(mapStateToProps, {
    fetchData, addTransaction,
})(TransactionsAdd);
