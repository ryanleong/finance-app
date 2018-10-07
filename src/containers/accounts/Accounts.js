import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';

import Navigation from '../../components/Navigation';
import fetchData from '../../actions/userDataActions';

import RenderAccounts from '../../components/accounts/Accounts';

class Accounts extends Component {
    componentDidMount() {
        this.props.fetchData();
    }

    render() {
        return (
            <React.Fragment>
                <Navigation />

                <Container>
                    <Row>
                        <Col>
                            <h1>Accounts</h1>
                        </Col>
                    </Row>
                    <Row>
                        <RenderAccounts accounts={this.props.userData.accounts} />
                    </Row>
                </Container>
            </React.Fragment>
        );
    }
}

Accounts.propTypes = {
    fetchData: PropTypes.func.isRequired,
    userData: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    userData: state.userData,
});

export default connect(mapStateToProps, { fetchData })(Accounts);
