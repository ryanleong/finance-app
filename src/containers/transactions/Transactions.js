import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Navigation from '../Navigation';
import { fetchTransactions, fetchTransactionPages } from '../../actions/transactionActions';
import { fetchCategory } from '../../actions/categoryActions';
import { fetchAccounts } from '../../actions/accountActions';

class Transactions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            page: 0,
        };

        this.renderTransactions = this.renderTransactions.bind(this);
        this.doPaginate = this.doPaginate.bind(this);
        this.queryForRequiredData = this.queryForRequiredData.bind(this);
    }

    queryForRequiredData() {
        setTimeout(() => {
            if (this.props.authentication.uid !== undefined) {
                if (this.props.transactions.requireUpdate) {
                    this.props.fetchTransactions(this.props.authentication.uid, null);
                }
                if (_.isEmpty(this.props.categories)) {
                    this.props.fetchCategory(this.props.authentication.uid);
                }
                if (_.isEmpty(this.props.accounts)) {
                    this.props.fetchAccounts(this.props.authentication.uid);
                }
                if (this.props.transactions.transactionTotalPages === -1) {
                    this.props.fetchTransactionPages(this.props.authentication.uid);
                }
            }
        }, 300);
    }

    doPaginate(evt) {
        const { page } = this.state;
        const totalPages = this.props.transactions.transactionTotalPages;
        const newPage = evt.target.id === 'prev' ? page - 1 : page + 1;

        if (newPage >= 0 && newPage < totalPages) {
            this.setState({
                page: evt.target.id === 'prev' ? page - 1 : page + 1,
            });

            // Do request for more transactions (if any)
            const numOfPagesForStoredTransactions = Math.ceil(this.props.transactions.transactionData.length / 5);
            if (numOfPagesForStoredTransactions < totalPages) {
                // Trigger query for more transactions
                this.props.fetchTransactions(this.props.authentication.uid, this.props.transactions.transactionData[this.props.transactions.transactionData.length - 1]);
            }
        }
    }

    renderTransactions() {
        const startIndex = this.state.page * 5;
        const endIndex = startIndex + 5;
        let counter = 0;

        return _.map(this.props.transactions.transactionData, (transaction, key) => {
            if (counter >= startIndex && counter < endIndex) {
                const trans = transaction.data();

                // Display proper string from ID
                const category = this.props.categories[trans.category] !== undefined ? this.props.categories[trans.category].name : '';

                const account = this.props.accounts[trans.account] !== undefined ? this.props.accounts[trans.account].name : '';

                counter += 1;

                return (
                    <tr key={key}>
                        <td>{trans.date}</td>
                        <td>{trans.name}</td>
                        <td>{trans.amount}</td>
                        <td>{account}</td>
                        <td>{category}</td>
                        <td>{trans.description}</td>
                    </tr>
                );
            }

            counter += 1;
            return null;
        });
    }

    render() {
        this.queryForRequiredData();

        return (
            <div>
                <Navigation />
                <h1>Transactions</h1>

                <div className="pagination">
                    <span onClick={this.doPaginate} id="prev">Previous</span>
                    <span onClick={this.doPaginate} id="next">Next</span>
                </div>

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
                        {this.renderTransactions()}
                    </tbody>
                </table>
            </div>
        );
    }
}

Transactions.propTypes = {
    fetchTransactions: PropTypes.func.isRequired,
    fetchTransactionPages: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, {
    fetchTransactions, fetchTransactionPages, fetchCategory, fetchAccounts,
})(Transactions);
