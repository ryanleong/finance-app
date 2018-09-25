import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import Navigation from '../Navigation';
import { fetchCategory } from '../../actions/categoryActions';

const renderCatgories = (categories) => {
    if (!_.isEmpty(categories)) {
        return _.map(categories, (category, key) => (
            <li key={key}>
                {category.name}
                {' '}
                <Link to="/categories/edit">Edit</Link>
            </li>
        ));
    }

    return null;
};

const Category = (props) => {
    if (props.authentication.uid !== undefined && _.isEmpty(props.categories)) {
        props.fetchCategory(props.authentication.uid);
    }

    return (
        <React.Fragment>
            <Navigation />
            <h1>Category</h1>
            <ul>
                {renderCatgories(props.categories)}
            </ul>
        </React.Fragment>
    );
};

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
