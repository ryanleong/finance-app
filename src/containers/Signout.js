import React from 'react';
import { Redirect } from 'react-router-dom';
import { auth } from '../firebase';

export default () => {
    auth.signOut();
    return <Redirect to="/" />;
};
