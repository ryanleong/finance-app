import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { db } from '../../firebase';
import Navigation from '../Navigation';
import { addAccounts, fetchAccounts } from '../../actions/accountActions';

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

    componentDidUpdate() {
        // Fetch account details
        this.props.fetchAccounts(this.props.authentication.uid);
    }

    onChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value,
        });
    }

    onSubmit(evt) {
        evt.preventDefault();

        db.collection('users').doc(this.props.authentication.uid).collection('accounts')
            .add({
                name: this.state.name,
            })
            .then((docRef) => {
                this.props.addAccounts(this.state, docRef.id);

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
    fetchAccounts: PropTypes.func.isRequired,
    addAccounts: PropTypes.func.isRequired,
    authentication: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    authentication: state.authentication,
});

export default connect(mapStateToProps, { addAccounts, fetchAccounts })(AccountsAdd);
