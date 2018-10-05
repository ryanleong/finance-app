import React from 'react';
import { Redirect } from 'react-router-dom';
import { auth } from '../../components/firebase';

export default () => {
    auth.signOut();
    return <Redirect to="/" />;
};
