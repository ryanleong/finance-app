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
            isFetchingCategories: false,
            isFetchingAccounts: false,
        };

        this.perPage = process.env.REACT_APP_TRANSACTIONS_PER_PAGE;

        this.renderTransactions = this.renderTransactions.bind(this);
        this.doPaginate = this.doPaginate.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        let { isFetchingCategories, isFetchingAccounts } = state;

        if (props.authentication.uid !== undefined) {
            if (props.transactions.requireUpdate) {
                // Fetch Transactions
                props.fetchTransactions(props.authentication.uid, null);

                // Get number of pages
                props.fetchTransactionPages(props.authentication.uid);
            }

            // Fetch Categories
            if (_.isEmpty(props.categories)) {
                if (!state.isFetchingCategories) {
                    isFetchingCategories = true;
                    props.fetchCategory(props.authentication.uid);
                }
            } else {
                isFetchingCategories = false;
            }

            // Fetch Accounts
            if (_.isEmpty(props.accounts)) {
                if (!state.isFetchingAccounts) {
                    isFetchingAccounts = true;
                    props.fetchAccounts(props.authentication.uid);
                }
            } else {
                isFetchingAccounts = false;
            }
        }

        return {
            ...state,
            isFetchingCategories,
            isFetchingAccounts,
        };
    }

    doPaginate(evt) {
        // Disable pagination when querying
        if (this.props.transactions.isFetchingTransactions) return;

        const { page } = this.state;
        const totalPages = this.props.transactions.transactionTotalPages;
        const newPage = evt.target.id === 'prev' ? page - 1 : page + 1;

        if (newPage >= 0 && newPage < totalPages) {
            // Do request for more transactions (if any)
            const numOfPagesForStoredTransactions = Math.ceil(this.props.transactions.transactionData.length / this.perPage);

            if (numOfPagesForStoredTransactions < totalPages && newPage === numOfPagesForStoredTransactions) {
                // Trigger query for more transactions
                this.props.fetchTransactions(this.props.authentication.uid, this.props.transactions.transactionData[this.props.transactions.transactionData.length - 1]);
            }

            this.setState({
                page: newPage,
            });
        }
    }

    renderTransactions() {
        if (this.props.transactions.transactionData.length > 0) {
            const returnJSX = [];
            const startIndex = this.state.page * this.perPage;

            // Set endIndex to length of transaction or next set. whichever is samller
            let endIndex = startIndex + parseInt(this.perPage, 10);
            endIndex = endIndex > this.props.transactions.transactionData.length ? this.props.transactions.transactionData.length : endIndex;

            for (let i = startIndex; i < endIndex; i += 1) {
                if (this.props.transactions.transactionData[i] !== undefined) {
                    const transaction = this.props.transactions.transactionData[i].data();

                    // Display proper string from ID
                    const category = this.props.categories[transaction.category] !== undefined ? this.props.categories[transaction.category].name : '';

                    const account = this.props.accounts[transaction.account] !== undefined ? this.props.accounts[transaction.account].name : '';

                    returnJSX.push(
                        <tr key={`transaction-${i}`}>
                            <td>{transaction.date}</td>
                            <td>{transaction.name}</td>
                            <td>{transaction.amount}</td>
                            <td>{account}</td>
                            <td>{category}</td>
                            <td>{transaction.description}</td>
                        </tr>,
                    );
                }
            }

            return returnJSX;
        }

        return null;
    }

    render() {
        return (
            <div>
                <Navigation />
                <h1>Transactions</h1>

                <div className="pagination">
                    <span onClick={this.doPaginate} id="prev">Previous</span>
                    <span onClick={this.doPaginate} id="next">Next</span>

                    <h3>
                        Page:
                        {' '}
                        {this.state.page + 1}
                    </h3>
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
    // fetchTransactionPages: PropTypes.func.isRequired,
    // fetchCategory: PropTypes.func.isRequired,
    // fetchAccounts: PropTypes.func.isRequired,
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
