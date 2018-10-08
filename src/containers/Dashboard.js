import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Jumbotron, Container } from 'reactstrap';

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

                <Container>
                    <Jumbotron>
                        <h1 className="display-3">Dashboard</h1>
                        <p className="lead">
                            Welcome to your dashboard. From here, you can view your monthly expense/income.
                        </p>
                    </Jumbotron>
                </Container>


                <Container>
                    <h6>Charts coming soon</h6>
                </Container>

            </React.Fragment>
        );
    }
}

Dashboard.propTypes = {
    fetchData: PropTypes.func.isRequired,
};


export default connect(null, { fetchData })(Dashboard);
