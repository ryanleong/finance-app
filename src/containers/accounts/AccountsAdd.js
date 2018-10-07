import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// import { db } from '../../components/firebase';
import Navigation from '../../components/Navigation';
import fetchData from '../../actions/userDataActions';
import addAccount from '../../actions/accountsActions';

// import { addAccounts } from '../../actions/accountActions';

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

    componentDidMount() {
        this.props.fetchData();
    }

    componentDidUpdate(prevProps) {
        // Redirect if successfully added new account
        if (prevProps.userData.isUpdatingAccount && !prevProps.userData.hasFailed
            && !this.props.userData.isUpdatingAccount && !this.props.userData.hasFailed) {
            this.props.history.push('/accounts');
        }
    }

    onChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value,
        });
    }

    onSubmit(evt) {
        evt.preventDefault();
        this.props.addAccount(this.state.name);
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
    fetchData: PropTypes.func.isRequired,
    addAccount: PropTypes.func.isRequired,
    userData: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    userData: state.userData,
});

export default connect(mapStateToProps, { fetchData, addAccount })(AccountsAdd);
