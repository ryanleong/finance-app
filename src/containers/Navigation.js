import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

const ifSignedIn = (signedIn) => {
    if (signedIn) {
        return (
            <React.Fragment>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li>
                    <Link to="/transactions">Transactions</Link>
                    <ul>
                        <li><Link to="/transactions/add">Add Transaction</Link></li>
                        <li><Link to="/transactions/edit">Edit Transaction</Link></li>
                        <li><Link to="/transactions/transfer">Transfer</Link></li>
                    </ul>
                </li>
                <li><Link to="/signout">Signout</Link></li>
            </React.Fragment>
        );
    }

    return (
        <React.Fragment>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/signin">Signin</Link></li>
        </React.Fragment>
    );
};

const Navigation = (props) => {
    const signedIn = !_.isEmpty(props.authentication);

    return (
        <ul>
            <li><Link to="/">Home</Link></li>
            {ifSignedIn(signedIn)}
        </ul>
    );
};

Navigation.propTypes = {
    authentication: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    authentication: state.authentication,
});

export default connect(mapStateToProps, {})(Navigation);
