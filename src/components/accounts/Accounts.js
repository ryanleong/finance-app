import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

const Accounts = ({ accounts }) => {
    if (!_.isEmpty(accounts)) {
        return _.map(accounts, (account, id) => (
            <li key={id}>
                {account.name}
                {' '}
                <Link to={`/accounts/edit/${id}`}>Edit</Link>
            </li>
        ));
    }

    return null;
};

export default Accounts;
