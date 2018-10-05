import React from 'react';
import { connect } from 'react-redux';

import updateAuthState from '../../actions/authenticationActions';

export default (BaseComponent) => {
    class HOC extends React.Component {
        componentWillMount() {
            this.props.updateAuthState();
        }

        render() {
            return <BaseComponent {...this.props} />;
        }
    }

    const mapStateToProps = state => ({
        authentication: state.authentication,
    });

    return connect(mapStateToProps, { updateAuthState })(HOC);
};
