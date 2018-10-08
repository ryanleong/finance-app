import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import validate from 'validate.js';
import {
    Container, Row, Col,
} from 'reactstrap';

import Navigation from '../../components/Navigation';
import TransactionsForm from '../../components/transactions/TransactionsForm';
import fetchData from '../../actions/userDataActions';
import { editTransaction } from '../../actions/transactionsActions';

const INITIAL_STATE = {
    name: '',
    amount: '',
    date: '',
    category: '-1',
    account: '-1',
    description: '',
    debitOrCredit: 'expense',
    errors: {},
};

const constraints = {
    name: {
        presence: { allowEmpty: false },
    },
    date: {
        presence: { allowEmpty: false },
    },
    amount: {
        presence: { allowEmpty: false },
        numericality: true,
    },
    account: {
        presence: { allowEmpty: false },
        exclusion: {
            within: ['-1'],
            message: 'Please select an account',
        },
    },
};

class TransactionsEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ...INITIAL_STATE,
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        // Get label name by id
        if (state.name === '') {
            // Get transaction
            const tempState = _.find(props.userData.transactions, transaction => transaction.id === props.match.params.id);
            if (tempState === undefined) return null;

            // Remove id
            const newState = { ...tempState };

            delete newState.id;
            if (newState.amount < 0) newState.debitOrCredit = 'expense';
            else newState.debitOrCredit = 'income';
            newState.date = newState.date.toISOString().substring(0, 10);
            newState.amount = Math.abs(newState.amount);


            return {
                ...state,
                ...newState,
            };
        }

        return null;
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

        const formValid = validate(submitData, constraints);

        if (formValid !== undefined) {
            this.setState({
                errors: formValid,
            });
            return;
        }

        // Remove error attribute
        delete submitData.errors;

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

        this.props.editTransaction(submitData, this.props.match.params.id);
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
                            <h1>Edit Transactions</h1>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <TransactionsForm onSubmit={this.onSubmit} onChange={this.onChange} state={this.state} userData={this.props.userData} />
                        </Col>
                    </Row>

                </Container>
            </React.Fragment>
        );
    }
}

TransactionsEdit.propTypes = {
    fetchData: PropTypes.func.isRequired,
    editTransaction: PropTypes.func.isRequired,
    userData: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    userData: state.userData,
});

export default connect(mapStateToProps, {
    fetchData, editTransaction,
})(TransactionsEdit);
