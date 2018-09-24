import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { db } from '../../firebase';
import Navigation from '../Navigation';
import { addAccounts } from '../../actions/accountActions';

const INITIAL_STATE = {
    name: '',
};

class AccountsAdd extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value,
        });
    }

    onSubmit(evt) {
        evt.preventDefault();

        db.collection('users').doc(this.props.authentication.uid).collection('accounts').doc(this.state.name)
            .set({})
            .then(() => {
                this.props.addAccounts(this.state);

                this.props.history.push('/accounts');
            });
    }

    render() {
        return (
            <React.Fragment>
                <Navigation />
                <h1>Add Account</h1>

                <form onSubmit={this.onSubmit}>
                    <input type="text" name="name" placeholder="Account Name" value={this.state.name} onChange={this.onChange} />
                    <input type="submit" value="Submit" />
                </form>
            </React.Fragment>
        );
    }
}

AccountsAdd.propTypes = {
    addAccounts: PropTypes.func.isRequired,
    authentication: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    authentication: state.authentication,
});

export default connect(mapStateToProps, { addAccounts })(AccountsAdd);
