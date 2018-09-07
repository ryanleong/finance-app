import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => (
    <ul>
        <li>
            <Link to="/">Home</Link>
        </li>
        <li>
            <Link to="/register">Register</Link>
        </li>
        <li>
            <Link to="/signin">Signin</Link>
        </li>
        <li>
            <Link to="/signout">Signout</Link>
        </li>
    </ul>
);

export default Navigation;
