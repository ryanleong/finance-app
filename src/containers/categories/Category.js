import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import Navigation from '../Navigation';
import { fetchCategory } from '../../actions/categoryActions';

class Category extends Component {
    componentDidUpdate() {
        // Fetch categories
        this.props.fetchCategory(this.props.authentication.uid);
    }

    renderCatgories() {
        const categories = this.props.categories.categoryData;

        if (!_.isEmpty(categories)) {
            return _.map(categories, (category, key) => (
                <li key={key}>
                    {category.name}
                    {' '}
                    <Link to={`/categories/edit/${key}`}>Edit</Link>
                </li>
            ));
        }

        return null;
    }

    render() {
        return (
            <React.Fragment>
                <Navigation />
                <h1>Category</h1>
                <ul>
                    {this.renderCatgories()}
                </ul>
            </React.Fragment>
        );
    }
}

Category.propTypes = {
    fetchCategory: PropTypes.func.isRequired,
    authentication: PropTypes.object.isRequired,
    categories: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    authentication: state.authentication,
    categories: state.categories,
});

export default connect(mapStateToProps, { fetchCategory })(Category);
