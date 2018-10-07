import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Navigation from '../components/Navigation';
import fetchData from '../actions/userDataActions';

class Dashboard extends Component {
    componentDidMount() {
        this.props.fetchData();
    }

    render() {
        return (
            <React.Fragment>
                <Navigation />
                <h1>Dashboard</h1>
            </React.Fragment>
        );
    }
}

Dashboard.propTypes = {
    fetchData: PropTypes.func.isRequired,
};


export default connect(null, { fetchData })(Dashboard);
