import React from 'react';
import { connect } from 'react-redux';

import { firebase } from '../firebase';
import updateAuthState from '../../actions/authenticationActions';

export default (BaseComponent) => {
    class HOC extends React.Component {
        componentWillMount() {
            firebase.auth().onAuthStateChanged((authUser) => {
                this.props.updateAuthState(authUser);
            });
        }

        render() {
            return <BaseComponent {...this.props} />;
        }
    }

    return connect(null, { updateAuthState })(HOC);
};
