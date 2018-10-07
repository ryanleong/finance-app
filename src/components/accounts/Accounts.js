import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

const Accounts = ({ accounts }) => {
    if (!_.isEmpty(accounts)) {
        return _.map(accounts, account => (
            <li key={account.id}>
                {account.data().name}
                {' '}
                <Link to={`/accounts/edit/${account.id}`}>Edit</Link>
            </li>
        ));
    }

    return null;
};

export default Accounts;
