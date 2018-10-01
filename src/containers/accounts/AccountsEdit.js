import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { db } from '../../firebase';
import Navigation from '../Navigation';
import { fetchAccounts, editAccounts } from '../../actions/accountActions';

class AccountsEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        if (!_.isEmpty(props.accounts.accountData) && state.name === '') {
            return {
                ...state,
                name: props.accounts.accountData[props.match.params.id].name,
            };
        }

        return { ...state };
    }

    componentDidUpdate() {
        // Fetch account details
        this.props.fetchAccounts(this.props.authentication.uid);
    }

    onChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value,
        });
    }

    onSubmit(evt) {
        evt.preventDefault();

        db.collection('users').doc(this.props.authentication.uid).collection('accounts').doc(this.props.match.params.id)
            .update({
                name: this.state.name,
            })
            .then(() => {
                this.props.editAccounts(this.state, this.props.match.params.id);

                this.props.history.push('/accounts');
            });
    }

    render() {
        return (
            <React.Fragment>
                <Navigation />
                <h1>Edit Account</h1>

                <form onSubmit={this.onSubmit}>
                    <input type="text" name="name" placeholder="Account Name" value={this.state.name} onChange={this.onChange} />
                    <input type="submit" value="Update" />
                </form>
            </React.Fragment>
        );
    }
}

AccountsEdit.propTypes = {
    fetchAccounts: PropTypes.func.isRequired,
    editAccounts: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    authentication: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    authentication: state.authentication,
    accounts: state.accounts,
});

export default connect(mapStateToProps, { fetchAccounts, editAccounts })(AccountsEdit);
