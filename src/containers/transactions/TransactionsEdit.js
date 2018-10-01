import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { db } from '../../firebase';

import Navigation from '../Navigation';
import { setTransactionsRequireUpdate } from '../../actions/transactionActions';
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
        const transactionToEdit = _.find(props.transactions.transactionData, transaction => transaction.id === props.match.params.id);

        // Assign data to state and fields
        if (transactionToEdit !== undefined) {
            if (state.name === '') {
                const newState = transactionToEdit.data();
                newState.description = newState.description === undefined ? '' : newState.description;

                return newState;
            }

            return { ...state };
        }

        // Redirect back to transactions page if no data to edit
        props.history.push('/transactions');

        return { ...state };
    }

    componentDidUpdate() {
        // Fetch Categories
        this.props.fetchCategory(this.props.authentication.uid);

        // Fetch Accounts
        this.props.fetchAccounts(this.props.authentication.uid);
    }

    onSubmit(evt) {
        evt.preventDefault();

        const submitData = { ...this.state };

        _.each(submitData, (item, key) => {
            if (item === '' || item === '-1') delete submitData[key];
        });

        db.collection('users').doc(this.props.authentication.uid).collection('transactions')
            .doc(this.props.match.params.id)
            .update(submitData)
            .then(() => {
                this.props.setTransactionsRequireUpdate();

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
                        {_.map(this.props.categories.categoryData, (category, key) => <option key={key} value={key}>{category.name}</option>)}
                    </select>

                    <select name="account" value={this.state.account} onChange={this.onChange}>
                        <option value="-1">No Account</option>
                        {_.map(this.props.accounts.accountData, (account, key) => <option key={key} value={key}>{account.name}</option>)}
                    </select>

                    <input type="date" name="date" value={this.state.date} onChange={this.onChange} />

                    <textarea name="description" value={this.state.description} onChange={this.onChange} />

                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

TransactionsEdit.propTypes = {
    setTransactionsRequireUpdate: PropTypes.func.isRequired,
    fetchCategory: PropTypes.func.isRequired,
    fetchAccounts: PropTypes.func.isRequired,
    authentication: PropTypes.object.isRequired,
    // transactions: PropTypes.object.isRequired,
    categories: PropTypes.object.isRequired,
    accounts: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    authentication: state.authentication,
    transactions: state.transactions,
    categories: state.categories,
    accounts: state.accounts,
});

export default connect(mapStateToProps, {
    setTransactionsRequireUpdate, fetchAccounts, fetchCategory,
})(TransactionsEdit);
