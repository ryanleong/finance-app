import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Navigation from '../../components/Navigation';
import fetchData from '../../actions/userDataActions';
import RenderCategories from '../../components/categories/Categories';

class Categories extends Component {
    componentDidMount() {
        this.props.fetchData();
    }

    render() {
        return (
            <React.Fragment>
                <Navigation />
                <h1>Category</h1>
                <ul>
                    <RenderCategories categories={this.props.userData.categories} />
                </ul>
            </React.Fragment>
        );
    }
}

Categories.propTypes = {
    fetchData: PropTypes.func.isRequired,
    userData: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    userData: state.userData,
});

export default connect(mapStateToProps, { fetchData })(Categories);
