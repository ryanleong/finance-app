import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Navigation from '../Navigation';
import { fetchTransactions } from '../../actions/transactionActions';

const renderTransactions = transactions => _.map(transactions, (transaction, key) => (
    <tr key={key}>
        <td>{transaction.date}</td>
        <td>{transaction.name}</td>
        <td>{transaction.amount}</td>
        <td>{transaction.account}</td>
        <td>{transaction.category}</td>
        <td>{transaction.description}</td>
    </tr>
));

const Transactions = (props) => {
    if (props.authentication.uid !== undefined && props.transactions.requireUpdate) {
        props.fetchTransactions(props.authentication.uid);
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
                    {renderTransactions(props.transactions.transactionData)}
                </tbody>
            </table>
        </div>
    );
};

Transactions.propTypes = {
    fetchTransactions: PropTypes.func.isRequired,
    authentication: PropTypes.object.isRequired,
    transactions: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    authentication: state.authentication,
    transactions: state.transactions,
});

export default connect(mapStateToProps, { fetchTransactions })(Transactions);
