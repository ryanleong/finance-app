import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Navigation from '../Navigation';
import { fetchAccounts } from '../../actions/accountActions';

class Accounts extends Component {
    componentDidUpdate() {
        // Fetch account details
        this.props.fetchAccounts(this.props.authentication.uid);
    }

    renderAccounts() {
        const accounts = this.props.accounts.accountData;

        if (!_.isEmpty(accounts)) {
            return _.map(accounts, (account, key) => (
                <li key={key}>
                    {account.name}
                    {' '}
                    <Link to={`/accounts/edit/${key}`}>Edit</Link>
                </li>
            ));
        }

        return null;
    }

    render() {
        return (
            <React.Fragment>
                <Navigation />
                <h1>Accounts</h1>
                <ul>
                    {this.renderAccounts()}
                </ul>
            </React.Fragment>
        );
    }
}

Accounts.propTypes = {
    fetchAccounts: PropTypes.func.isRequired,
    authentication: PropTypes.object.isRequired,
    accounts: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    authentication: state.authentication,
    accounts: state.accounts,
});

export default connect(mapStateToProps, { fetchAccounts })(Accounts);
