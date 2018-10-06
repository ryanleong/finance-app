import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import updateAuthState from '../../actions/authenticationActions';

export default (BaseComponent) => {
    class AuthCheck extends React.Component {
        shouldComponentUpdate(nextProps) {
            if (_.isEmpty(nextProps.authentication)) {
                this.props.history.push('/signin');
            }

            return true;
        }

        render() {
            if (!_.isEmpty(this.props.authentication)) {
                return <BaseComponent {...this.props} />;
            }
            return null;
        }
    }

    const mapStateToProps = state => ({
        authentication: state.authentication,
    });

    return connect(mapStateToProps, { updateAuthState })(AuthCheck);
};
