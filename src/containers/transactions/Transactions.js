import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Navigation from '../Navigation';
import { fetchTransactions } from '../../actions/transactionActions';
import { fetchCategory } from '../../actions/categoryActions';
import { fetchAccounts } from '../../actions/accountActions';

const renderTransactions = props => _.map(props.transactions.transactionData, (transaction, key) => {
    // Display proper string from ID
    const category = props.categories[transaction.category] !== undefined ? props.categories[transaction.category].name : '';

    const account = props.accounts[transaction.account] !== undefined ? props.accounts[transaction.account].name : '';

    return (
        <tr key={key}>
            <td>{transaction.date}</td>
            <td>{transaction.name}</td>
            <td>{transaction.amount}</td>
            <td>{account}</td>
            <td>{category}</td>
            <td>{transaction.description}</td>
        </tr>
    );
});

const Transactions = (props) => {
    if (props.authentication.uid !== undefined && props.transactions.requireUpdate) {
        props.fetchTransactions(props.authentication.uid);
    }
    if (props.authentication.uid !== undefined && _.isEmpty(props.categories)) {
        props.fetchCategory(props.authentication.uid);
    }
    if (props.authentication.uid !== undefined && _.isEmpty(props.accounts)) {
        props.fetchAccounts(props.authentication.uid);
    }

    return (
        <div>
            <Navigation />
            <h1>Transactions</h1>

            <table>
                <thead>
                    <tr>
                        <td>Date</td>
                        <td>Name</td>
                        <td>Amount</td>
                        <td>Account</td>
                        <td>Category</td>
                        <td>Description</td>
                    </tr>
                </thead>
                <tbody>
                    {renderTransactions(props)}
                </tbody>
            </table>
        </div>
    );
};

Transactions.propTypes = {
    fetchTransactions: PropTypes.func.isRequired,
    fetchCategory: PropTypes.func.isRequired,
    fetchAccounts: PropTypes.func.isRequired,
    authentication: PropTypes.object.isRequired,
    transactions: PropTypes.object.isRequired,
    categories: PropTypes.object.isRequired,
    accounts: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    authentication: state.authentication,
    transactions: state.transactions,
    categories: state.categories,
    accounts: state.accounts,
});

export default connect(mapStateToProps, { fetchTransactions, fetchCategory, fetchAccounts })(Transactions);
