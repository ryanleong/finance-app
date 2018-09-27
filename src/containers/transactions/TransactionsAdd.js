import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { db } from '../../firebase';

import Navigation from '../Navigation';
import { addTransaction, fetchTransactionCount } from '../../actions/transactionActions';
import { fetchCategory } from '../../actions/categoryActions';
import { fetchAccounts } from '../../actions/accountActions';

const INITIAL_STATE = {
    name: '',
    amount: '',
    date: '',
    category: '-1',
    account: '-1',
    description: '',
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

    componentDidUpdate(prevProps) {
        setTimeout(() => {
            if (this.props.authentication.uid !== undefined) {
                if (this.props.transactions.transactionCount === -1 && prevProps.transactions.transactionCount === -1) {
                    this.props.fetchTransactionCount(this.props.authentication.uid);
                }
                if (_.isEmpty(prevProps.categories) && _.isEmpty(this.props.categories)) {
                    this.props.fetchCategory(this.props.authentication.uid);
                }
                if (_.isEmpty(prevProps.accounts) && _.isEmpty(this.props.accounts)) {
                    this.props.fetchAccounts(this.props.authentication.uid);
                }
            }
        }, 400);
    }

    onSubmit(evt) {
        evt.preventDefault();

        const submitData = { ...this.state };

        _.each(submitData, (item, key) => {
            if (item === '' || item === '-1') delete submitData[key];
        });

        db.collection('users').doc(this.props.authentication.uid).collection('transactions').add(submitData)
            .then((doc) => {
                this.props.addTransaction(this.props.authentication.uid, this.props.transactions.transactionCount, doc);

                setTimeout(() => {
                    this.props.history.push('/transactions');
                }, 100);
            });
    }

    onChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value,
        });
    }

    render() {
        return (
            <div>
                <Navigation />
                <h1>Add Transaction</h1>

                <form onSubmit={this.onSubmit}>
                    <input type="text" name="name" placeholder="Transaction Name" value={this.state.name} onChange={this.onChange} />
                    <input type="text" name="amount" placeholder="Amount" value={this.state.amount} onChange={this.onChange} />

                    <select name="category" value={this.state.category} onChange={this.onChange}>
                        <option value="-1">No Category</option>
                        {_.map(this.props.categories, (category, key) => <option key={key} value={key}>{category.name}</option>)}
                    </select>

                    <select name="account" value={this.state.account} onChange={this.onChange}>
                        <option value="-1">No Account</option>
                        {_.map(this.props.accounts, (account, key) => <option key={key} value={key}>{account.name}</option>)}
                    </select>

                    <input type="date" name="date" value={this.state.date} onChange={this.onChange} />

                    <textarea name="description" value={this.state.description} onChange={this.onChange} />

                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

TransactionsAdd.propTypes = {
    addTransaction: PropTypes.func.isRequired,
    fetchTransactionCount: PropTypes.func.isRequired,
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
    addTransaction, fetchTransactionCount, fetchAccounts, fetchCategory,
})(TransactionsAdd);
