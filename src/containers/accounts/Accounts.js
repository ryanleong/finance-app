import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Navigation from '../Navigation';
import { fetchAccounts } from '../../actions/accountActions';

const renderAccounts = (categories) => {
    if (!_.isEmpty(categories)) {
        return _.map(categories, (category, key) => <li key={key}>{key}</li>);
    }

    return null;
};

const Accounts = (props) => {
    if (props.authentication.uid !== undefined && _.isEmpty(props.accounts)) {
        props.fetchAccounts(props.authentication.uid);
    }
    return (
        <React.Fragment>
            <Navigation />
            <h1>Accounts</h1>
            <ul>
                {renderAccounts(props.accounts)}
            </ul>
        </React.Fragment>
    );
};

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