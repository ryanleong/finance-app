import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Container, Row, Col } from 'reactstrap';

import Navigation from '../../components/Navigation';
import fetchData from '../../actions/userDataActions';
import { deleteCategory } from '../../actions/categoryActions';
import RenderCategories from '../../components/categories/Categories';

class Categories extends Component {
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
                            <h1>Category</h1>
                        </Col>
                    </Row>
                    <Row>
                        {_.isEmpty(this.props.userData.accounts) ? <Col><h4>No Categories</h4></Col> : <RenderCategories categories={this.props.userData.categories} doDelete={this.props.deleteCategory} />}
                    </Row>
                </Container>
            </React.Fragment>
        );
    }
}

Categories.propTypes = {
    fetchData: PropTypes.func.isRequired,
    deleteCategory: PropTypes.func.isRequired,
    userData: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    userData: state.userData,
});

export default connect(mapStateToProps, { fetchData, deleteCategory })(Categories);
