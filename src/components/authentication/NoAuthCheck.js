import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import updateAuthState from '../../actions/authenticationActions';

export default (BaseComponent) => {
    class NoAuthCheck extends React.Component {
        shouldComponentUpdate(nextProps) {
            if (!_.isEmpty(nextProps.authentication)) {
                this.props.history.push('/dashboard');
            }

            return true;
        }

        render() {
            return <BaseComponent {...this.props} />;
        }
    }

    const mapStateToProps = state => ({
        authentication: state.authentication,
    });

    return connect(mapStateToProps, { updateAuthState })(NoAuthCheck);
};
