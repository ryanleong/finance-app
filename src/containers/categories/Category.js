import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

// import { db } from '../../firebase';
import Navigation from '../Navigation';
import { fetchCategory } from '../../actions/categoryActions';

const Category = (props) => {
    if (props.authentication.uid !== undefined && _.isEmpty(props.categories)) {
        props.fetchCategory(props.authentication.uid);
    }

    return (
        <React.Fragment>
            <Navigation />
            <h1>Category</h1>
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
