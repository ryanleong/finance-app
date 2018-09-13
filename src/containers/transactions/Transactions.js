import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Navigation from '../Navigation';
import { fetchTransactions } from '../../actions/transactionActions';

const Transactions = (props) => {
    if (props.authentication.uid !== undefined && props.transactions.requireUpdate) {
        props.fetchTransactions(props.authentication.uid);
    }

    return (
        <div>
            <Navigation />
            <h1>Transactions</h1>
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
